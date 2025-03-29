# Eletrocast

Eletrocast é um projeto desenvolvido para gerenciar transmissões de áudio e vídeo em tempo real.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
[`.env.example`](.env.example )         # Exemplo de variáveis de ambiente
[`.env.local`](.env.local )           # Configurações locais de ambiente
[`components.json`](components.json )      # Configuração de componentes
[`middleware.ts`](middleware.ts )        # Middleware para requisições
[`tsconfig.json`](tsconfig.json )        # Configuração do TypeScript
app/                 # Diretório principal da aplicação
components/          # Componentes reutilizáveis
doc/                 # Documentação adicional
lib/                 # Bibliotecas auxiliares
public/              # Arquivos públicos (imagens, fontes, etc.)
```

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Tailwind CSS**: Framework CSS utilitário.
- **API YouTube**: API para fazer requisições dos vídeos e lives.

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/zwlucas/eletrocast-tcc.git
   cd eletrocast
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env.local` e preencha as variáveis necessárias.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção.
- `npm start`: Inicia o servidor em modo de produção.
- `npm run lint`: Verifica o código com o ESLint.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Descrição da alteração"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato pelo e-mail: [dsn.lucas@outlook.com](dsn.lucas@outlook.com).