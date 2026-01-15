# 🔐 Credenciais de Acesso - Painel Admin

## Credenciais de Teste

Para acessar o painel administrativo, use as seguintes credenciais:

| Campo | Valor |
|-------|-------|
| **Email** | `demo@cafe.com` |
| **Senha** | `demo123` |

## Como Acessar

1. Vá para o site: `https://cafe-da-julio.onrender.com`
2. Clique no botão **"Login Admin"** no canto superior direito
3. Insira o email e senha acima
4. Clique em **"Entrar"**

## O que você pode fazer no Painel Admin

✅ **Gerenciar Disponibilidade de Itens**
- Ativar/desativar cafés do dia
- Ativar/desativar salgados
- Ativar/desativar doces
- Ativar/desativar marmitas fit

✅ **Controlar o Cardápio**
- Ver todos os itens cadastrados
- Alternar disponibilidade com um clique
- Visualizar preços de cada item

## Como Criar Novas Credenciais de Barista

Para adicionar mais baristas com acesso ao painel admin, você precisa inserir dados diretamente no banco de dados PostgreSQL:

### Via SQL (Recomendado)

```sql
-- Inserir nova barista com email e senha
INSERT INTO "baristaCredentials" (email, "passwordHash", name, "isActive", "createdAt", "updatedAt")
VALUES (
  'barista@cafe.com',
  '$2b$10$...',  -- Use bcrypt hash da senha (veja abaixo como gerar)
  'Nome da Barista',
  true,
  NOW(),
  NOW()
);
```

### Como Gerar Hash de Senha com Bcrypt

Use o Node.js para gerar um hash seguro:

```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('sua_senha_aqui', 10).then(hash => console.log(hash));"
```

Copie o hash gerado e use no comando SQL acima.

## Segurança

⚠️ **Importante:**
- Nunca compartilhe as credenciais em mensagens de texto ou email
- Mude a senha padrão após o primeiro acesso
- Use senhas fortes (mínimo 8 caracteres)
- Cada barista deve ter seu próprio email e senha

## Problemas Comuns

### "Email ou senha inválidos"
- Verifique se o email está correto (case-sensitive)
- Verifique se a senha está correta
- Certifique-se de que a barista está ativa (isActive = true)

### "Erro ao atualizar disponibilidade"
- Verifique se você está conectado
- Tente fazer logout e login novamente
- Verifique a conexão com a internet

## Suporte

Para adicionar novas baristas ou resetar senhas, entre em contato com o desenvolvedor do site.
