package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/gorilla/websocket"
	_ "github.com/lib/pq"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	oauth2Config = oauth2.Config{
		ClientID:     "...",
		ClientSecret: "...",
		RedirectURL:  "http://localhost:8080/auth/callback",
		Scopes:       []string{"openid", "email", "profile"},
		Endpoint:     google.Endpoint,
	}
	oauth2StateString = "random"                                      // String para segurança
	store             = sessions.NewCookieStore([]byte("secret-key")) // Store para sessão
)

var db *sql.DB
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type GoogleUser struct {
	GoogleID   string `json:"id"`
	Name       string `json:"name"`
	GivenName  string `json:"given_name"`
	FamilyName string `json:"family_name"`
	Email      string `json:"email"`
	Picture    string `json:"picture"`
}

type Message struct {
	UserID  int    `json:"user_id"`
	Message string `json:"message"`
}

func main() {
	var err error
	connStr := "user=postgres dbname=livechat password=postgres sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Erro ao conectar ao banco de dados:", err)
	}
	defer db.Close()

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/auth/callback", callbackHandler)
	http.HandleFunc("/logout", logoutHandler)
	http.HandleFunc("/ws", handleWebSocket)
	http.HandleFunc("/clear-chat", clearChatHandler)
	http.ListenAndServe(":8080", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session")
	user := session.Values["user"]
	if user == nil {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}
	fmt.Fprintf(w, "Olá, %s! <a href='/logout'>Sair</a>", user)
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	url := oauth2Config.AuthCodeURL(oauth2StateString, oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusFound)
}

func callbackHandler(w http.ResponseWriter, r *http.Request) {
	if r.FormValue("state") != oauth2StateString {
		http.Error(w, "State inválido", http.StatusBadRequest)
		return
	}

	code := r.FormValue("code")
	token, err := oauth2Config.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, "Erro ao obter o token", http.StatusInternalServerError)
		return
	}

	client := oauth2Config.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json")
	if err != nil {
		http.Error(w, "Erro ao buscar as informações do usuário", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var googleUser GoogleUser
	err = json.Unmarshal(body, &googleUser)
	if err != nil {
		http.Error(w, "Erro ao parsear o JSON", http.StatusInternalServerError)
		return
	}

	var userID int
	err = db.QueryRow("SELECT id FROM users WHERE google_id = $1", googleUser.GoogleID).Scan(&userID)
	if err != nil {
		if err == sql.ErrNoRows {
			_, err := db.Exec("INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3)", googleUser.GoogleID, googleUser.Name, googleUser.Email)
			if err != nil {
				log.Fatal("Erro ao inserir usuário:", err)
				return
			}

			err = db.QueryRow("SELECT id FROM users WHERE google_id = $1", googleUser.GoogleID).Scan(&userID)
			if err != nil {
				log.Fatal("Erro ao buscar id do novo usuário:", err)
				return
			}
		} else {
			log.Fatal("Erro ao buscar o usuário:", err)
			return
		}
	}

	session, _ := store.Get(r, "session")
	session.Values["user"] = googleUser.Name
	session.Values["user_id"] = userID
	session.Save(r, w)

	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session")
	session.Values["user"] = nil
	session.Values["user_id"] = nil
	session.Save(r, w)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Erro ao fazer upgrade para WebSocket:", err)
		return
	}
	defer conn.Close()

	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			log.Println("Erro ao ler mensagem:", err)
			break
		}

		_, err = db.Exec("INSERT INTO messages (user_id, message) VALUES ($1, $2)", msg.UserID, msg.Message)
		if err != nil {
			log.Println("Erro ao armazenar mensagem:", err)
			break
		}

		err = conn.WriteJSON(msg)
		if err != nil {
			log.Println("Erro ao enviar mensagem:", err)
			break
		}
	}
}

func clearChatHandler(w http.ResponseWriter, r *http.Request) {
	_, err := db.Exec("DELETE FROM messages")
	if err != nil {
		http.Error(w, "Erro ao limpar o chat", http.StatusInternalServerError)
		return
	}
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
