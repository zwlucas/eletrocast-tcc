### **Passo 1: Construir e Rodar o Contêiner Docker**

Com o `Dockerfile` e `nginx.conf` prontos, agora você pode construir e executar o contêiner.

#### **1. Construir a Imagem Docker**

No terminal, dentro da pasta onde os arquivos `Dockerfile` e `nginx.conf` estão localizados, execute:

```bash
docker build -t nginx-rtmp .
```

#### **2. Rodar o Contêiner Docker**

Depois de construir a imagem, você pode rodar o contêiner:

```bash
docker run -d -p 80:80 -p 1935:1935 --name nginx-rtmp nginx-rtmp
```

- O contêiner estará rodando em segundo plano (`-d`).
- Ele mapeia a porta 80 (HTTP) e 1935 (RTMP) para as mesmas portas no seu host.

---

### **Passo 2: Verificando o Funcionamento**

1. **Verifique se o NGINX está funcionando:**
   - Acesse `http://<IP do servidor>/hls` no navegador. Se você não ver nada, significa que o RTMP ainda não está ativo, mas isso é esperado até você começar a transmitir com o OBS.
   
2. **Verifique se o stream RTMP está ativo:**
   - No OBS, configure a URL do servidor como `rtmp://<IP do servidor>/live` e inicie a transmissão.
   - O NGINX começará a gerar o arquivo HLS em `/tmp/hls`.