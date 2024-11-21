### **1. Infraestrutura de Streaming com NGINX e RTMP Module**

Para configurar a infraestrutura de streaming, iremos usar o **NGINX com o módulo RTMP**. Este módulo permite transmitir vídeos ao vivo, recebidos de softwares como OBS Studio, e entregá-los ao seu site via HLS (HTTP Live Streaming).

---

### **Passo 1: Configurar o Servidor**
#### **1. Instalar NGINX e RTMP Module**
- Certifique-se de que o servidor Linux (Ubuntu/Debian) está configurado. 
- Instale dependências necessárias:
  ```bash
  sudo apt update
  sudo apt install build-essential libpcre3 libpcre3-dev libssl-dev zlib1g-dev git
  ```
- Baixe o código-fonte do NGINX e do módulo RTMP:
  ```bash
  wget http://nginx.org/download/nginx-1.25.2.tar.gz
  tar -xzvf nginx-1.25.2.tar.gz
  cd nginx-1.25.2
  git clone https://github.com/arut/nginx-rtmp-module.git
  ```
- Compile e instale o NGINX com suporte ao RTMP:
  ```bash
  ./configure --add-module=./nginx-rtmp-module --with-http_ssl_module
  make
  sudo make install
  ```
- Após a instalação, o NGINX estará localizado em `/usr/local/nginx`.

---

#### **2. Configurar o RTMP**
- Edite o arquivo de configuração do NGINX (`/usr/local/nginx/conf/nginx.conf`) e adicione:
  ```nginx
  rtmp {
      server {
          listen 1935;
          chunk_size 4096;

          # Aceitar streams
          application live {
              live on;
              record off;
              hls on;
              hls_path /tmp/hls;
              hls_fragment 2s;
              hls_playlist_length 10s;
          }
      }
  }

  http {
      include       mime.types;
      default_type  application/octet-stream;

      server {
          listen 80;
          server_name localhost;

          location /hls {
              types {
                  application/vnd.apple.mpegurl m3u8;
                  video/mp2t ts;
              }
              root /tmp;
              add_header Cache-Control no-cache;
          }
      }
  }
  ```
- Esse bloco faz o seguinte:
  - Configura o RTMP para receber transmissões em `rtmp://<IP do servidor>/live`.
  - Gera arquivos HLS na pasta `/tmp/hls` para reprodução no navegador.

---

#### **3. Criar a Estrutura de Diretórios**
- Certifique-se de que o diretório `/tmp/hls` existe e tem as permissões corretas:
  ```bash
  sudo mkdir -p /tmp/hls
  sudo chmod 777 /tmp/hls
  ```

---

#### **4. Iniciar o NGINX**
- Inicie o NGINX com o seguinte comando:
  ```bash
  sudo /usr/local/nginx/sbin/nginx
  ```
- Verifique se está funcionando acessando `http://<IP do servidor>/hls`.

---

### **Passo 2: Transmitir com OBS Studio**
1. Abra o OBS Studio e vá para **Configurações > Transmissão**.
2. Selecione:
   - **Tipo de Serviço**: Personalizado.
   - **URL do Servidor**: `rtmp://<IP do servidor>/live`.
   - **Chave de Transmissão**: Escolha algo único (ex.: `test`).
3. Comece a transmitir no OBS.

---

### **Passo 3: Reproduzir o Stream no Navegador**
- Use um player HLS como [Video.js](https://videojs.com/):
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <link href="https://vjs.zencdn.net/7.20.3/video-js.css" rel="stylesheet" />
  </head>
  <body>
      <video id="live-stream" class="video-js vjs-default-skin" controls autoplay width="640" height="360">
          <source src="http://<IP do servidor>/hls/test.m3u8" type="application/x-mpegURL">
      </video>
      <script src="https://vjs.zencdn.net/7.20.3/video.js"></script>
  </body>
  </html>
  ```
- Substitua `<IP do servidor>` pelo endereço do servidor.

---

### **Passo 4: Proteger a Transmissão**
- Adicione autenticação para evitar acessos não autorizados. Exemplo para proteger o RTMP:
  ```nginx
  application live {
      live on;
      hls on;
      hls_path /tmp/hls;
      hls_fragment 2s;

      allow publish 127.0.0.1; # Permitir apenas do servidor local
      deny publish all;
  }
  ```
- Para maior segurança, integrar autenticação via tokens no futuro.

---