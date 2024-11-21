### **1. Infraestrutura de Streaming**
- **NGINX com RTMP Module**:
  1. Configure o [NGINX RTMP module](https://github.com/arut/nginx-rtmp-module) para receber o stream do OBS Studio ou outro software de streaming.
  2. Direcione o RTMP para seu site, onde ele será exibido via player HTML5.
  3. Use [HLS](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions) para melhor compatibilidade com navegadores.
  4. Configure regras de segurança, como autenticação para streams.

---

### **2. Desenvolvimento do Chat ao Vivo**
- **Backend em Go**:
  - Use o framework **Echo** ou **Fiber** para APIs REST.
  - Configure um websocket para o chat ao vivo, que permita mensagens em tempo real.
  - **Funcionalidades do Chat**:
    - Armazenamento de mensagens no PostgreSQL (ex.: tabela `messages` com campos `id`, `username`, `message`, `timestamp`, `live_id`).
    - Endpoint para limpar mensagens (`DELETE /chats/{live_id}`).
    - Endpoint para obter mensagens anteriores (`GET /chats/{live_id}`).
  - Use **JWT** para autenticação dos usuários.

- **Banco de Dados PostgreSQL**:
  - Tabela `users` para informações dos usuários, incluindo os nomes extraídos do Google.
  - Tabela `live_sessions` para gerenciar lives ativas (ex.: `id`, `title`, `start_time`, `is_active`).
  - Tabela `messages` para salvar mensagens.

---

### **3. Login com Google**
- Use a biblioteca [OAuth2](https://developers.google.com/identity/protocols/oauth2) em Go:
  1. Implemente um fluxo de autenticação com a API do Google.
  2. Após o login, extraia o nome do usuário e salve na sessão/banco de dados.
  3. Gere um token JWT para autenticar o usuário em todas as requisições.

---

### **4. Frontend**
- **Player de Vídeo**:
  - Use players compatíveis com HLS, como [Video.js](https://videojs.com/).
- **Chat**:
  - Desenvolva o frontend com **React** ou **Vue.js** para consumir a API do chat.
  - Use WebSockets para comunicação em tempo real.
  - Integre o login com Google no frontend.

---

### **5. Limpando o Chat para Novas Lives**
- No backend, associe mensagens a `live_id`. Quando uma nova live começar:
  - Insira um novo registro na tabela `live_sessions`.
  - Limpe as mensagens anteriores relacionadas ao `live_id` ativo ou arquive-as.

---

### **6. Deploy**
- Use **Docker** para facilitar a implantação:
  - Crie contêineres para NGINX, Go app, PostgreSQL.
  - Configure volumes para persistência de dados.
- Utilize **NGINX** como proxy reverso para o site e APIs.
- Considere hospedar em serviços como AWS, Google Cloud, ou DigitalOcean para escalabilidade.

---

### **7. Monitoramento e Segurança**
- **Certificado SSL**:
  - Use o **Let’s Encrypt** para garantir conexões HTTPS.
- **Firewall**:
  - Restrinja acesso ao servidor RTMP.
- **Logs e Monitoramento**:
  - Integre com ferramentas como Prometheus e Grafana para monitoramento.