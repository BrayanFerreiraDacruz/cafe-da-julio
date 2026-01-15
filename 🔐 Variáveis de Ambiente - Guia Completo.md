# 🔐 Variáveis de Ambiente - Guia Completo

Este documento explica todas as variáveis de ambiente necessárias para rodar o Café da Júlio.

---

## 📋 Variáveis Obrigatórias

### DATABASE_URL (OBRIGATÓRIO)

**O que é:** String de conexão com o banco de dados PostgreSQL

**Formato:**
```
postgresql://username:password@host:port/database
```

**Exemplos:**

Local (seu computador):
```
postgresql://postgres:senha123@localhost:5432/cafe_da_julio
```

Render:
```
postgresql://cafe_admin:sua_senha_super_segura@seu-host.render.com:5432/cafe_da_julio
```

**Como obter no Render:**
1. Vá para seu banco de dados PostgreSQL no Render
2. Procure por "External Database URL"
3. Copie a URL completa (começa com `postgresql://`)

---

### NODE_ENV

**O que é:** Define se está em desenvolvimento ou produção

**Valores:**
- `development` - Para desenvolvimento local
- `production` - Para deploy no Render

**Exemplo:**
```
NODE_ENV=production
```

---

### JWT_SECRET (OBRIGATÓRIO)

**O que é:** Chave secreta para assinar tokens de autenticação

**Como gerar:**
1. Acesse https://www.uuidgenerator.net/
2. Clique em "Generate UUID v4"
3. Copie o valor gerado
4. Use como JWT_SECRET

**Exemplo:**
```
JWT_SECRET=550e8400-e29b-41d4-a716-446655440000
```

**Importante:** Mantenha isso seguro! Não compartilhe com ninguém.

---

## 🔑 Variáveis de Autenticação (Manus)

Se estiver usando Manus para autenticação:

### VITE_APP_ID

**O que é:** ID da sua aplicação no Manus

**Onde obter:** No painel do Manus

### OAUTH_SERVER_URL

**O que é:** URL do servidor OAuth do Manus

**Valor padrão:**
```
OAUTH_SERVER_URL=https://api.manus.im
```

### VITE_OAUTH_PORTAL_URL

**O que é:** URL do portal de login do Manus

**Valor padrão:**
```
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
```

### OWNER_OPEN_ID

**O que é:** ID único do proprietário do café no Manus

**Onde obter:** No painel do Manus

### OWNER_NAME

**O que é:** Nome do proprietário

**Exemplo:**
```
OWNER_NAME=Café da Júlio
```

---

## 🌐 Variáveis de APIs Manus (Opcional)

Se estiver usando serviços Manus:

### BUILT_IN_FORGE_API_URL

**O que é:** URL da API Manus para serviços backend

**Valor padrão:**
```
BUILT_IN_FORGE_API_URL=https://api.manus.im
```

### BUILT_IN_FORGE_API_KEY

**O que é:** Chave de API para serviços Manus (servidor)

**Onde obter:** No painel do Manus

### VITE_FRONTEND_FORGE_API_KEY

**O que é:** Chave de API para serviços Manus (frontend)

**Onde obter:** No painel do Manus

### VITE_FRONTEND_FORGE_API_URL

**O que é:** URL da API Manus para frontend

**Valor padrão:**
```
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
```

---

## 🎨 Variáveis de Aplicação

### VITE_APP_TITLE

**O que é:** Título da aplicação (aparece na aba do navegador)

**Exemplo:**
```
VITE_APP_TITLE=Café da Júlio
```

### VITE_APP_LOGO

**O que é:** Caminho da logo

**Valor padrão:**
```
VITE_APP_LOGO=/logo.png
```

---

## 📊 Variáveis de Analytics (Opcional)

### VITE_ANALYTICS_ENDPOINT

**O que é:** URL do serviço de analytics

**Exemplo:**
```
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
```

### VITE_ANALYTICS_WEBSITE_ID

**O que é:** ID do website no serviço de analytics

**Exemplo:**
```
VITE_ANALYTICS_WEBSITE_ID=abc123def456
```

---

## 📱 Variáveis Customizadas

### WHATSAPP_NUMBER

**O que é:** Número do WhatsApp para receber pedidos

**Formato:** 55 + DDD + número (sem espaços ou caracteres especiais)

**Exemplo:**
```
WHATSAPP_NUMBER=5554988776655
```

---

## 🚀 Como Configurar no Render

### Passo 1: Acessar Configurações

1. Vá para seu serviço no Render
2. Clique em **Environment**

### Passo 2: Adicionar Variáveis

1. Clique em **Add Environment Variable**
2. Preencha:
   - **Key:** Nome da variável (ex: DATABASE_URL)
   - **Value:** Valor (ex: mysql://...)
3. Clique em **Save**

### Passo 3: Reiniciar Serviço

O Render reinicia automaticamente com as novas variáveis.

---

## 💻 Como Configurar Localmente

### Passo 1: Criar Arquivo .env.local

Na raiz do projeto, crie um arquivo chamado `.env.local`:

```bash
# Linux/Mac
touch .env.local

# Windows
type nul > .env.local
```

### Passo 2: Adicionar Variáveis

Abra `.env.local` e adicione:

```env
DATABASE_URL=mysql://root:senha123@localhost:3306/cafe_da_julio
NODE_ENV=development
JWT_SECRET=550e8400-e29b-41d4-a716-446655440000
VITE_APP_TITLE=Café da Júlio
VITE_APP_LOGO=/logo.png
```

### Passo 3: Não Commitar

Adicione `.env.local` ao `.gitignore`:

```bash
echo ".env.local" >> .gitignore
```

---

## ⚠️ Checklist de Segurança

- [ ] JWT_SECRET é uma string aleatória forte
- [ ] DATABASE_URL tem senha segura
- [ ] .env.local não está no Git
- [ ] Não compartilhei JWT_SECRET com ninguém
- [ ] Variáveis sensíveis estão seguras no Render
- [ ] Não comitei .env files

---

## 🔍 Verificar Variáveis

Para verificar se as variáveis estão corretas:

```bash
# Local
cat .env.local

# Render
# Vá para Environment no painel do Render
```

---

## 🐛 Erros Comuns

### Erro: "DATABASE_URL is not set"

**Solução:** Verifique se a variável está configurada corretamente

### Erro: "Cannot connect to database"

**Solução:** 
- Verifique a URL do banco
- Certifique-se que a senha não tem caracteres especiais
- Teste a conexão localmente

### Erro: "JWT_SECRET is too short"

**Solução:** Use uma string com pelo menos 32 caracteres

---

## 📝 Resumo Rápido

**Mínimo necessário:**
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
JWT_SECRET=seu_secret_aleatorio
```

**Recomendado:**
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
JWT_SECRET=seu_secret_aleatorio
VITE_APP_TITLE=Café da Júlio
VITE_APP_LOGO=/logo.png
OWNER_NAME=Café da Júlio
```

---

**Boa sorte! 🚀**
