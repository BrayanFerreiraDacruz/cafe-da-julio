# Guia de Deployment - Café da Júlio

## Visão Geral

Este documento fornece instruções completas para fazer deploy do site do Café da Júlio em Render ou Firebase. O site é uma aplicação full-stack com React frontend, Express backend, e banco de dados MySQL.

## Pré-requisitos

- Node.js 18+ instalado
- Conta no Render.com ou Firebase
- Banco de dados MySQL (TiDB recomendado)
- Variáveis de ambiente configuradas

## Deployment no Render

### Passo 1: Preparar o Repositório

```bash
# Inicializar git (se não estiver já)
git init
git add .
git commit -m "Initial commit: Café da Júlio website"

# Fazer push para GitHub
git remote add origin https://github.com/seu-usuario/cafe-da-julio.git
git push -u origin main
```

### Passo 2: Criar Serviço no Render

1. Acesse [render.com](https://render.com)
2. Clique em "New +" e selecione "Web Service"
3. Conecte seu repositório GitHub
4. Configure as seguintes opções:

**Configurações Básicas:**
- Name: `cafe-da-julio`
- Environment: `Node`
- Region: `São Paulo` (ou mais próximo)
- Branch: `main`

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

### Passo 3: Configurar Variáveis de Ambiente

No painel do Render, adicione as seguintes variáveis de ambiente:

```
DATABASE_URL=mysql://usuario:senha@host:porta/cafe_da_julio
JWT_SECRET=seu-secret-aleatorio-muito-seguro
NODE_ENV=production
VITE_APP_ID=seu-app-id-manus
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua-chave-api
VITE_FRONTEND_FORGE_API_KEY=sua-chave-frontend
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
OWNER_OPEN_ID=seu-open-id
OWNER_NAME=Júlio
```

### Passo 4: Configurar Banco de Dados

1. Crie um banco de dados MySQL/TiDB
2. Atualize `DATABASE_URL` com as credenciais
3. Execute as migrações:

```bash
npm run db:push
```

### Passo 5: Deploy

Clique em "Create Web Service" no Render. O deploy começará automaticamente.

## Deployment no Firebase

### Passo 1: Instalar Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### Passo 2: Inicializar Firebase

```bash
firebase init hosting
```

Selecione seu projeto Firebase e configure:
- Public directory: `client/dist`
- Single-page app: `Yes`

### Passo 3: Configurar Backend (Cloud Functions)

```bash
firebase init functions
```

Copie o código do servidor para `functions/src/index.ts`.

### Passo 4: Deploy

```bash
npm run build
firebase deploy
```

## Configuração de Domínio Personalizado

### No Render:

1. Vá para Settings > Custom Domain
2. Adicione seu domínio (ex: cafedalulio.com.br)
3. Siga as instruções para configurar DNS

### No Firebase:

1. Vá para Hosting > Custom Domain
2. Adicione seu domínio
3. Configure os registros DNS conforme indicado

## Variáveis de Ambiente Explicadas

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão do banco de dados MySQL |
| `JWT_SECRET` | Chave secreta para assinar tokens JWT (use algo aleatório e seguro) |
| `VITE_APP_ID` | ID da aplicação no Manus OAuth |
| `OAUTH_SERVER_URL` | URL do servidor OAuth do Manus |
| `BUILT_IN_FORGE_API_KEY` | Chave de API para serviços internos do Manus |
| `VITE_FRONTEND_FORGE_API_KEY` | Chave de API para o frontend |

## Monitoramento e Logs

### No Render:

- Acesse "Logs" no dashboard do serviço
- Configure alertas em Settings > Alerts

### No Firebase:

- Use Firebase Console > Logs
- Configure alertas em Cloud Functions > Logs

## Backup do Banco de Dados

### Backup Manual:

```bash
# Exportar banco de dados
mysqldump -u usuario -p cafe_da_julio > backup.sql

# Restaurar banco de dados
mysql -u usuario -p cafe_da_julio < backup.sql
```

### Backup Automático:

Configure backups automáticos no seu provedor de banco de dados (TiDB, AWS RDS, etc).

## Troubleshooting

### Erro: "Cannot find module"

```bash
# Reinstale dependências
npm install
npm run build
```

### Erro: "Database connection failed"

- Verifique `DATABASE_URL`
- Confirme que o banco de dados está acessível
- Verifique firewall/security groups

### Erro: "OAuth callback failed"

- Verifique `VITE_APP_ID` e `OAUTH_SERVER_URL`
- Confirme que o domínio está registrado no Manus OAuth

## Performance e Otimização

### Cache:

- Imagens estáticas são servidas com cache de 1 ano
- JavaScript/CSS são comprimidos e minificados

### Banco de Dados:

- Adicione índices nas colunas `category` e `isAvailable` em `menuItems`
- Use conexão pooling para melhor performance

### CDN:

- Configure um CDN (Cloudflare, AWS CloudFront) para servir assets estáticos

## Segurança

### HTTPS:

- Render e Firebase fornecem HTTPS automaticamente
- Redirecione HTTP para HTTPS

### Variáveis Sensíveis:

- Nunca commite `.env` no Git
- Use o sistema de variáveis de ambiente da plataforma

### SQL Injection:

- Todas as queries usam prepared statements (Drizzle ORM)
- Validação de entrada com Zod

### CORS:

- Configure CORS apropriadamente para seu domínio

## Atualizações e Manutenção

### Atualizar Código:

```bash
git push origin main
# Deploy automático será acionado
```

### Atualizar Dependências:

```bash
npm update
npm audit fix
npm run build
npm run test
git push origin main
```

## Contato e Suporte

Para dúvidas sobre deployment, entre em contato com o time de desenvolvimento.

---

**Última atualização:** Janeiro 2024
**Versão:** 1.0.0
