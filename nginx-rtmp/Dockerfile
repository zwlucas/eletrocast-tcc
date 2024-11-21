# Use uma imagem do Ubuntu
FROM ubuntu:20.04

# Instalar o NGINX
RUN apt-get update && apt-get install -y \
    build-essential \
    libpcre3 \
    libpcre3-dev \
    libssl-dev \
    zlib1g-dev \
    wget \
    git \
    && apt-get clean

# Baixar o NGINX e o módulo RTMP
RUN wget http://nginx.org/download/nginx-1.25.2.tar.gz && \
    tar -xzvf nginx-1.25.2.tar.gz && \
    cd nginx-1.25.2 && \
    git clone https://github.com/arut/nginx-rtmp-module.git && \
    ./configure --add-module=./nginx-rtmp-module --with-http_ssl_module && \
    make && \
    make install

# Definir diretórios e permissões
RUN mkdir -p /usr/local/nginx/logs /tmp/hls && \
    chmod 777 /tmp/hls

# Copiar o arquivo de configuração do NGINX
COPY nginx.conf /usr/local/nginx/conf/nginx.conf

# Expor as portas para HTTP (80) e RTMP (1935)
EXPOSE 80 1935

# Comando para iniciar o NGINX
CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]