# Pizzaria Frontend

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Frontend da aplicação de pizzaria, desenvolvido com Next.js e TypeScript.

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para produção.
- [React](https://reactjs.org/) - Biblioteca para construção de interfaces de usuário.
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript que adiciona tipagem estática.
- [Sass](https://sass-lang.com/) - Pré-processador CSS.
- [Lucide React](https://lucide.dev/) - Biblioteca de ícones.

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

## ⚙️ Como Instalar e Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/pizzaria-frontend.git
   ```

2. **Navegue até o diretório do projeto:**
   ```bash
   cd pizzaria-frontend
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Abra o navegador e acesse:**
   [http://localhost:3000](http://localhost:3000)

## 📂 Estrutura de Pastas

A estrutura de pastas segue o padrão do Next.js (App Router):

```
/
├── public/         # Arquivos estáticos
├── src/
│   ├── app/        # Rotas da aplicação
│   ├── components/ # Componentes reutilizáveis
│   ├── lib/        # Funções e tipos auxiliares
│   ├── providers/  # Provedores de contexto
│   ├── services/   # Lógica de API
│   └── styles/     # Estilos globais
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

## ✨ Funcionalidades

- [x] Autenticação de usuários.
- [x] Dashboard para gerenciamento de pedidos.
- [x] Criação e listagem de produtos.
- [x] Criação e listagem de categorias.
- [x] Modal para visualização de detalhes do pedido.

## 🤝 Como Contribuir

Contribuições são bem-vindas! Para contribuir, siga os passos abaixo:

1. **Faça um fork do projeto.**
2. **Crie uma nova branch:** `git checkout -b minha-feature`
3. **Faça suas alterações e commit:** `git commit -m 'feat: Minha nova feature'`
4. **Envie para a sua branch:** `git push origin minha-feature`
5. **Abra um Pull Request.**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.