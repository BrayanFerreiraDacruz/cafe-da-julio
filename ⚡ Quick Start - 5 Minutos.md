# ⚡ Quick Start - 5 Minutos

## Passo 1: Instale Node.js

Baixe em https://nodejs.org/ (versão LTS 22.13.0 ou superior)

Verifique:
```bash
node --version
npm --version
```

---

## Passo 2: Instale pnpm

```bash
npm install -g pnpm
pnpm --version
```

---

## Passo 3: Instale Dependências

Na pasta do projeto:
```bash
pnpm install
```

---

## Passo 4: Configure Banco de Dados

Se estiver usando **Manus**, pule este passo.

Se estiver rodando **localmente**, crie um arquivo `.env.local` na raiz:

```env
DATABASE_URL="mysql://root:senha123@localhost:3306/cafe_da_julio"
```

Depois execute:
```bash
pnpm db:push
```

---

## Passo 5: Inicie o Servidor

```bash
pnpm dev
```

Abra: http://localhost:3000

---

## ✅ Pronto!

Se vir a página do Café da Júlio com o logo, está funcionando! 🎉

---

## 🐛 Se Tiver Erros

**Erro: "Cannot find module"**
```bash
rm -rf node_modules
pnpm install
```

**Erro: "ts(2307)"**
- Feche e reabra o VS Code
- Execute: `pnpm install`

**Erro: "Port 3000 already in use"**
- Feche outros programas usando a porta 3000
- Ou use: `pnpm dev -- --port 3001`

---

Leia `SETUP_LOCAL.md` para instruções completas!
