# Gerador de QR Code 🚀

Um gerador de QR Code simples, moderno e eficiente, desenvolvido com **Vue 3 (Vite)** e **Node.js**.

Gere QR Codes de **links, textos, WhatsApp, Wi-Fi e e-mail**, escolha cor e fundo e baixe em **PNG (1024 px) ou SVG**. Desde a versão 2.0 o código é gerado direto no navegador (biblioteca `qrcode`), sem ida ao servidor.

**Online:** https://gerador-qr-code-plum.vercel.app · **Portfólio:** https://portfolio-lucasalves.vercel.app

## 📁 Estrutura do Projeto

A estrutura segue o padrão moderno de aplicações Vite + Vue:

- **`src/`**: Código fonte da aplicação frontend.
  - **`assets/`**: Estilos e recursos estáticos.
  - **`components/`**: Componentes Vue reutilizáveis.
  - **`services/`**: Lógica de integração com a API.
- **`api/`**: Funções serverless para geração de QR Code na Vercel.
- **`backend/`**: Servidor Node.js/Express para desenvolvimento local.
- **`public/`**: Arquivos estáticos servidos diretamente.

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (v16+)
- NPM ou Yarn

### Desenvolvimento Local

1. **Instalar Dependências**:
   ```bash
   npm install
   npm run backend:install
   ```

2. **Rodar Tudo Junto (Frontend + Backend)**:
   ```bash
   npm run dev
   ```
   *O frontend rodará em `http://localhost:5173` e o backend em `http://localhost:3000`.*

### Produção (Vercel)
Este projeto está configurado para implantação automática na Vercel. Basta conectar seu repositório e ele identificará as funções serverless na pasta `api/` e a aplicação frontend na raiz.

## 🛠️ Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/) - Framework frontend
- [Vite](https://vitejs.dev/) - Ferramenta de build ultra-rápida
- [Node.js](https://nodejs.org/) - Ambiente de execução backend
- [Express](https://expressjs.com/) - Servidor local legado (`backend/`) e função `api/generate`, mantidos por compatibilidade
- [node-qrcode](https://www.npmjs.com/package/qrcode) - Biblioteca para geração de QR Codes

## 🎨 Funcionalidades

- ✅ Prévia instantânea enquanto você digita
- ✅ Tipos: link, texto, WhatsApp (com mensagem), Wi-Fi (WPA/WEP/aberta) e e-mail
- ✅ Cor do código e do fundo, com aviso de pouco contraste
- ✅ Nível de correção de erro (L/M/Q/H)
- ✅ Download em PNG ou SVG e cópia da imagem
- ✅ Responsivo e acessível por teclado

Testes: `npm test`

---
Desenvolvido por [Lucas Alves](https://github.com/Lucas19Alves) · [Portfólio](https://portfolio-lucasalves.vercel.app/)
