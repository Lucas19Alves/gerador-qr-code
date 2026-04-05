# Gerador de QR Code 🚀

Um gerador de QR Code simples, moderno e eficiente, desenvolvido com **Vue 3 (Vite)** e **Node.js**.

Este projeto permite gerar QR Codes a partir de qualquer texto ou URL, com suporte para personalização de cores e implantação facilitada na Vercel.

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
- [Express](https://expressjs.com/) - Framework web para Node.js
- [node-qrcode](https://www.npmjs.com/package/qrcode) - Biblioteca para geração de QR Codes

## 🎨 Funcionalidades

- ✅ Geração instantânea de QR Code
- ✅ Suporte a links e textos
- ✅ Personalização de cores (Dark/Light)
- ✅ Design responsivo e moderno (Bootstrap 5)
- ✅ Download direto da imagem gerada

---
Desenvolvido por [Lucas Alves](https://github.com/Lucas19Alves)
