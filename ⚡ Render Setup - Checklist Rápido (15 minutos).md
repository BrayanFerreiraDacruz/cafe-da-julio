# ⚡ Render Setup - Checklist Rápido (15 minutos)

## ✅ Pré-requisitos

- [x] Conta GitHub

- [x] Código do projeto no GitHub

- [x] Conta Render ([https://render.com](https://render.com) )

---

## 🗄️ Passo 1: Criar Banco de Dados MySQL (5 min)

1. Acesse [https://render.com/dashboard](https://render.com/dashboard)

1. Clique em **+ New** → **MySQL**

1. Preencha:
  - **Name:** `cafe-julio-db`
  - **Database:** `cafe_da_julio`
  - **Username:** `cafe_admin`
  - **Password:** Clique em "Generate"
  - **Region:** Escolha a mais próxima

1. Clique em **Create Database**

1. Aguarde 2-3 minutos

1. **Copie a URL:** `mysql://cafe_admin:...@seu-host.render.com:3306/cafe_da_julio`

---

## 🚀 Passo 2: Deploy da Aplicação (10 min )

### 2.1 Criar Serviço Web

1. Clique em **+ New** → **Web Service**

1. Clique em **Connect your GitHub account**

1. Selecione `cafe_da_julio`

### 2.2 Configurar

Preencha:

- **Name:** `cafe-da-julio`

- **Environment:** `Node`

- **Region:** Mesmo do banco

- **Branch:** `main`

- **Build Command:** `pnpm install && pnpm build`

- **Start Command:** `pnpm start`

### 2.3 Adicionar Variáveis de Ambiente

Clique em **Advanced** → **Add Environment Variable**

Adicione estas 3 variáveis OBRIGATÓRIAS:

| Key | Value |
| --- | --- |
| `DATABASE_URL` | `mysql://cafe_admin:SUA_SENHA@seu-host.render.com:3306/cafe_da_julio` |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Gere em [https://www.uuidgenerator.net/](https://www.uuidgenerator.net/) (copie um UUID ) |

### 2.4 Iniciar Deploy

Clique em **Create Web Service**

Aguarde 5-10 minutos. Procure por:

```
✓ Build successful
✓ Server running
```

---

## ✨ Passo 3: Testar (Pronto!)

Quando terminar, você verá uma URL como:

```
https://cafe-da-julio.onrender.com
```

Clique nela para acessar seu site!

---

## 📋 Valores para Copiar/Colar

### Database URL (do Passo 1 )

```
mysql://cafe_admin:SENHA@seu-host.render.com:3306/cafe_da_julio
```

### JWT_SECRET (gere aqui: [https://www.uuidgenerator.net/](https://www.uuidgenerator.net/) )

```
550e8400-e29b-41d4-a716-446655440000
```

---

## 🔄 Atualizar Código

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O Render faz deploy automaticamente! ✨

---

## 🐛 Se Algo Deu Errado

| Problema | Solução |
| --- | --- |
| Build failed | Verifique o log, execute `pnpm build` localmente |
| Cannot connect to database | Verifique DATABASE_URL, certifique-se que a senha está correta |
| Site não carrega | Aguarde alguns minutos, Render pode ser lento no plano free |
| Erros no log | Clique em **Logs** para ver detalhes |

---

## 📞 Próximos Passos

1. ✅ Acesse o admin: `https://cafe-da-julio.onrender.com/admin`

1. ✅ Adicione itens de menu

1. ✅ Configure seu número de WhatsApp (veja `RENDER_DEPLOYMENT.md` )

1. ✅ Compartilhe o link com clientes!

---

**Pronto! 🎉 Seu site está no ar!**

Para mais detalhes, leia `RENDER_DEPLOYMENT.md`

