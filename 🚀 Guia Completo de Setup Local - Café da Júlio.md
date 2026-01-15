# 🚀 Guia Completo de Setup Local - Café da Júlio

Este guia ajudará você a configurar o projeto Café da Júlio no seu computador local com VS Code.

---

## 📋 Pré-requisitos

### 1. Node.js (OBRIGATÓRIO)

**Windows:**
1. Acesse https://nodejs.org/
2. Baixe a versão **LTS (22.13.0 ou superior)**
3. Execute o instalador e siga as instruções
4. Reinicie seu computador

**macOS:**
```bash
# Usando Homebrew
brew install node

# Ou acesse https://nodejs.org/ e baixe o instalador
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verificar instalação:**
```bash
node --version  # Deve mostrar v22.13.0 ou superior
npm --version   # Deve mostrar 10.x ou superior
```

---

## 📦 Instalação de Dependências

### Passo 1: Abra o Terminal no VS Code

1. Abra a pasta do projeto no VS Code
2. Pressione `Ctrl + Backtick` (ou `Cmd + Backtick` no Mac) para abrir o terminal
3. Ou vá em **Terminal → New Terminal**

### Passo 2: Instale o pnpm (Gerenciador de Pacotes)

```bash
npm install -g pnpm
```

Verificar instalação:
```bash
pnpm --version  # Deve mostrar 10.x ou superior
```

### Passo 3: Instale as Dependências do Projeto

Na pasta raiz do projeto (`cafe_da_julio`), execute:

```bash
pnpm install
```

Isso vai instalar todas as dependências necessárias (pode levar 2-5 minutos).

### Passo 4: Configure o Banco de Dados

```bash
pnpm db:push
```

Este comando cria as tabelas no banco de dados.

---

## 🔧 Configuração do Banco de Dados

O projeto usa **MySQL** por padrão. Você tem 3 opções:

### Opção A: Usar Manus (Recomendado - Mais Fácil)

Se você está usando Manus, o banco de dados já está configurado automaticamente. Pule para a próxima seção.

### Opção B: MySQL Local (Windows)

1. Baixe e instale [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
2. Durante a instalação, defina:
   - **Root Password:** sua_senha_segura
   - **Port:** 3306 (padrão)

3. Crie um arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL="mysql://root:sua_senha_segura@localhost:3306/cafe_da_julio"
```

4. Execute:
```bash
pnpm db:push
```

### Opção C: MySQL com Docker (Mais Profissional)

Se você tem Docker instalado:

```bash
docker run --name cafe-db -e MYSQL_ROOT_PASSWORD=senha123 -e MYSQL_DATABASE=cafe_da_julio -p 3306:3306 -d mysql:8.0
```

Depois crie `.env.local`:
```env
DATABASE_URL="mysql://root:senha123@localhost:3306/cafe_da_julio"
```

---

## ▶️ Executar o Projeto

### Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

Você verá algo como:
```
Server running on http://localhost:3000/
```

### Acessar o Site

Abra seu navegador e vá para: **http://localhost:3000**

---

## 🧪 Executar Testes

```bash
pnpm test
```

Deve mostrar:
```
✓ server/auth.logout.test.ts (1 test)
✓ server/menu.test.ts (11 tests)
Test Files  2 passed (2)
Tests  12 passed (12)
```

---

## 🐛 Resolver Erros Comuns

### Erro: "Cannot find module 'react'"

**Solução:**
```bash
pnpm install
```

### Erro: "ts(2307) Cannot find module"

**Solução:**
1. Feche o VS Code completamente
2. Delete a pasta `node_modules`:
   ```bash
   rm -rf node_modules  # Linux/Mac
   rmdir /s node_modules  # Windows
   ```
3. Limpe o cache do pnpm:
   ```bash
   pnpm store prune
   ```
4. Reinstale:
   ```bash
   pnpm install
   ```
5. Reabra o VS Code

### Erro: "DATABASE_URL is not set"

**Solução:**
Você precisa de um banco de dados. Siga a seção "Configuração do Banco de Dados" acima.

### Erro: "Port 3000 already in use"

**Solução:**
```bash
# Linux/Mac: Encontre o processo
lsof -i :3000
kill -9 <PID>

# Windows: Use o Task Manager para fechar o processo na porta 3000
```

---

## 📁 Estrutura do Projeto

```
cafe_da_julio/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas (Home, Orders, etc)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── lib/           # Utilitários
│   │   └── App.tsx        # Arquivo principal
│   └── public/            # Arquivos estáticos (logo.png)
├── server/                # Backend Express + tRPC
│   ├── routers.ts         # Definição das APIs
│   ├── db.ts              # Funções de banco de dados
│   └── _core/             # Configuração interna
├── drizzle/               # Migrações do banco de dados
├── package.json           # Dependências do projeto
└── tsconfig.json          # Configuração TypeScript
```

---

## 🎨 Personalizações

### Mudar o Número do WhatsApp

Edite estes arquivos e procure por `5554999999999`:

1. `client/src/pages/Orders.tsx` (linha ~95)
2. `client/src/pages/MarmitasFit.tsx` (linha ~95)
3. `client/src/pages/Location.tsx` (linha ~25)

Substitua por: `55` + DDD + número (ex: `5554988776655`)

### Adicionar Itens de Menu

Via painel admin (http://localhost:3000/admin) ou via SQL:

```sql
INSERT INTO menuItems (name, category, price, description, isAvailable) 
VALUES ('Café Espresso', 'daily', 5.50, 'Café espresso puro', true);
```

---

## 📚 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Testes
pnpm test             # Executa testes unitários
pnpm test --watch     # Modo watch (reexecuta ao salvar)

# Banco de dados
pnpm db:push          # Sincroniza schema com banco
pnpm db:studio        # Abre interface visual do banco

# Build
pnpm build            # Compila para produção
pnpm start            # Inicia servidor de produção

# Linting
pnpm check            # Verifica erros TypeScript
pnpm format           # Formata código
```

---

## 🚀 Próximos Passos

1. ✅ Instale Node.js e pnpm
2. ✅ Execute `pnpm install`
3. ✅ Configure o banco de dados
4. ✅ Execute `pnpm dev`
5. ✅ Acesse http://localhost:3000
6. ✅ Adicione seus itens de menu
7. ✅ Configure seu número de WhatsApp

---

## 💬 Suporte

Se encontrar problemas:

1. Verifique se Node.js está instalado: `node --version`
2. Verifique se pnpm está instalado: `pnpm --version`
3. Tente limpar cache e reinstalar: `rm -rf node_modules && pnpm install`
4. Verifique a porta 3000 não está em uso
5. Reinicie o VS Code

---

**Boa sorte! 🎉 Se tiver dúvidas, me avise!**
