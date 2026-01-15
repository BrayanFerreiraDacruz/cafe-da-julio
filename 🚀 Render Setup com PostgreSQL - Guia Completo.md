# 🚀 Render Setup com PostgreSQL - Guia Completo

Este guia mostra como fazer deploy da aplicação Café da Júlio no Render usando **PostgreSQL** (não MySQL).

---

## ⚡ Quick Setup (15 minutos)

### Passo 1: Criar Banco PostgreSQL no Render

1. Acesse [https://render.com/dashboard](https://render.com/dashboard)

1. Clique em **+ New** → **PostgreSQL**

1. Preencha:-
  - **Name:** [`cafe-julio-db`](https://cafe-da-julio.onrender.com/)
  - **Database:** `cafe_da_julio`
  - **User:** `cafe_admin`
  - **Password:** Clique em "Generate" (copia automaticamente )
  - **Region:** Escolha a mais próxima

1. Clique em **Create Database**

1. Aguarde 2-3 minutos

### Passo 2: Copiar Connection String

Quando o banco estiver pronto, você verá:

```
External Database URL:
postgresql://cafe_admin:SENHA@seu-host.render.com:5432/cafe_da_julio
```

**Copie esta URL completa** - você vai precisar dela!

### Passo 3: Deploy da Aplicação

1. Clique em **+ New** → **Web Service**

1. Conecte seu GitHub (autorize o Render)

1. Selecione o repositório `cafe_da_julio`

Preencha:

- **Name:** `cafe-da-julio`

- **Environment:** `Node`

- **Region:** Mesmo do banco

- **Branch:** `main`

- **Build Command:** `pnpm install && pnpm build`

- **Start Command:** `pnpm start`

### Passo 4: Adicionar Variáveis de Ambiente

Clique em **Advanced** → **Add Environment Variable**

Adicione OBRIGATORIAMENTE:

| Key | Value |
| --- | --- |
| `DATABASE_URL` | `postgresql://cafe_admin:SENHA@seu-host.render.com:5432/cafe_da_julio` |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Gere em [https://www.uuidgenerator.net/](https://www.uuidgenerator.net/) (copie um UUID ) |

### Passo 5: Iniciar Deploy

Clique em **Create Web Service**

Aguarde 5-10 minutos. Procure por:

```
✓ Build successful
✓ Server running
```

### Passo 6: Pronto!

Quando terminar, você verá uma URL como:

```
https://cafe-da-julio.onrender.com
```

Clique nela para acessar seu site! 🎉

---

## 📋 Diferenças: PostgreSQL vs MySQL

| Aspecto | PostgreSQL (Render ) | MySQL |
| --- | --- | --- |
| **Porta** | 5432 | 3306 |
| **URL** | `postgresql://...` | `mysql://...` |
| **Sintaxe** | Mais rigorosa | Mais flexível |
| **Performance** | Excelente | Bom |
| **Custo** | Grátis no Render | Grátis no Render |

---

## 🔧 Configuração Técnica

### Connection String Explicada

```
postgresql://cafe_admin:SENHA@seu-host.render.com:5432/cafe_da_julio
         ↑         ↑      ↑    ↑                    ↑    ↑
      protocolo  user  senha host                porta database
```

### Variáveis Obrigatórias

**DATABASE_URL** - Cópia exata do External Database URL do Render

**NODE_ENV** - Deve ser `production` para deploy

**JWT_SECRET** - String aleatória para assinar tokens (mínimo 32 caracteres)

---

## 🧪 Testar Conexão

Após o deploy:

1. Acesse `https://cafe-da-julio.onrender.com`

1. Vá para `/admin` para acessar o painel

1. Tente adicionar um item de menu

1. Se funcionar, o banco está conectado!

---

## 📊 Monitorar Aplicação

### Logs em Tempo Real

1. No Render, clique no seu serviço

1. Vá para a aba **Logs**

1. Veja todos os eventos em tempo real

### Métricas

1. Clique na aba **Metrics**

1. Veja CPU, memória e requisições

---

## 🔄 Atualizar Código

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O Render detecta automaticamente e faz novo deploy (5-10 minutos ).

---

## 🐛 Solução de Problemas

### Erro: "Cannot connect to database"

**Solução:**

1. Verifique se a URL do banco está correta

1. Certifique-se que a senha não tem caracteres especiais

1. Verifique se o banco está em execução no Render

### Erro: "Build failed"

**Solução:**

1. Verifique o log de build no Render

1. Execute localmente: `pnpm build`

1. Se tiver erros, corrija e faça push novamente

### Site está lento

**Solução:**

1. Espere alguns minutos (plano free pode ser lento)

1. Verifique o log de erros

1. Reinicie o serviço: clique em **Restart** no Render

---

## 💾 Backup do Banco

### Criar Backup

No Render:

1. Vá para o banco de dados

1. Clique em **Backups**

1. Clique em **Create Backup**

### Restaurar Backup

1. Vá para **Backups**

1. Clique em **Restore** no backup desejado

---

## 🎯 Próximos Passos

1. ✅ Banco PostgreSQL criado no Render

1. ✅ Aplicação deployada

1. ✅ Variáveis de ambiente configuradas

1. ✅ Site acessível em [https://cafe-da-julio.onrender.com](https://cafe-da-julio.onrender.com)

**Agora:**

1. Adicione itens de menu via admin panel

1. Configure seu número de WhatsApp

1. Compartilhe o link com clientes

---

## 📞 Suporte

- **Documentação Render:** [https://render.com/docs](https://render.com/docs)

- **Status Render:** [https://status.render.com](https://status.render.com)

- **Suporte Render:** [https://render.com/support](https://render.com/support)

---

**Parabéns! Seu site está no ar! 🚀**

