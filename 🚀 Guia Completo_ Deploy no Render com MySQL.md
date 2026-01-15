# 🚀 Guia Completo: Deploy no Render com MySQL

Este guia mostra como fazer deploy da aplicação Café da Júlio no Render com banco de dados MySQL.

---

## 📋 O que você vai fazer

1. ✅ Criar uma conta no Render
2. ✅ Criar um banco de dados MySQL no Render
3. ✅ Configurar variáveis de ambiente
4. ✅ Deploy da aplicação
5. ✅ Testar tudo funcionando

**Tempo estimado:** 20-30 minutos

---

## 🔑 Passo 1: Criar Conta no Render

1. Acesse https://render.com
2. Clique em **Sign Up**
3. Escolha **Sign up with GitHub** (recomendado)
4. Autorize o acesso
5. Pronto! Você está logado

---

## 🗄️ Passo 2: Criar Banco de Dados MySQL

### 2.1 Acessar Dashboard

1. No Render, clique em **Dashboard** (canto superior esquerdo)
2. Clique em **+ New**
3. Selecione **MySQL**

### 2.2 Configurar o Banco de Dados

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `cafe-julio-db` |
| **Database** | `cafe_da_julio` |
| **Username** | `cafe_admin` |
| **Password** | Gere uma senha forte (clique em "Generate") |
| **Region** | Escolha a mais próxima (ex: São Paulo se disponível, senão us-east) |
| **Plan** | Free (ou pago se precisar de mais recursos) |

### 2.3 Criar o Banco

Clique em **Create Database**

Aguarde 2-3 minutos enquanto o banco é criado.

### 2.4 Copiar Informações de Conexão

Quando o banco estiver pronto, você verá uma tela com:

```
External Database URL:
mysql://cafe_admin:SEU_PASSWORD@seu-host.render.com:3306/cafe_da_julio
```

**Copie esta URL completa** - você vai precisar dela!

---

## 🌐 Passo 3: Preparar o Repositório GitHub

### 3.1 Fazer Push do Código

Se você ainda não tem o código no GitHub:

```bash
# No diretório do projeto
git init
git add .
git commit -m "Initial commit: Café da Júlio website"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/cafe_da_julio.git
git push -u origin main
```

Se já tem no GitHub, apenas certifique-se que está atualizado:

```bash
git add .
git commit -m "Update: dark theme and logo"
git push
```

---

## 🚀 Passo 4: Deploy da Aplicação

### 4.1 Criar Novo Serviço no Render

1. No Dashboard do Render, clique em **+ New**
2. Selecione **Web Service**

### 4.2 Conectar GitHub

1. Clique em **Connect your GitHub account**
2. Autorize o Render a acessar seus repositórios
3. Selecione o repositório `cafe_da_julio`

### 4.3 Configurar o Serviço

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Name** | `cafe-da-julio` |
| **Environment** | `Node` |
| **Region** | Mesmo do banco (ex: São Paulo) |
| **Branch** | `main` |
| **Build Command** | `pnpm install && pnpm build` |
| **Start Command** | `pnpm start` |

### 4.4 Adicionar Variáveis de Ambiente

Clique em **Advanced** e depois em **Add Environment Variable**

Adicione estas variáveis:

```
DATABASE_URL=mysql://cafe_admin:SEU_PASSWORD@seu-host.render.com:3306/cafe_da_julio
NODE_ENV=production
JWT_SECRET=sua_chave_secreta_aleatoria_aqui_32_caracteres
VITE_APP_ID=seu_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
```

**Onde obter os valores:**

- **DATABASE_URL**: Copie da seção anterior (URL do banco)
- **NODE_ENV**: Deixe como `production`
- **JWT_SECRET**: Gere uma string aleatória (use: https://www.uuidgenerator.net/ e copie um UUID)
- **VITE_APP_ID**: Se estiver usando Manus OAuth, copie de lá. Se não, use um UUID
- **OAUTH_SERVER_URL**: Deixe como está
- **VITE_OAUTH_PORTAL_URL**: Deixe como está

### 4.5 Iniciar Deploy

Clique em **Create Web Service**

Aguarde 5-10 minutos enquanto o Render:
1. Clona seu repositório
2. Instala dependências
3. Compila o código
4. Inicia o servidor

Você verá um log em tempo real. Procure por mensagens como:
```
✓ Build successful
✓ Server running on port 3000
```

---

## ✅ Passo 5: Testar a Aplicação

### 5.1 Acessar o Site

Quando o deploy terminar, o Render fornecerá uma URL como:
```
https://cafe-da-julio.onrender.com
```

Clique nela ou copie e cole no navegador.

### 5.2 Verificar Banco de Dados

1. Acesse a página de admin: `https://cafe-da-julio.onrender.com/admin`
2. Tente fazer login
3. Tente adicionar um item de menu

Se funcionar, o banco está conectado corretamente!

---

## 🔧 Passo 6: Configurações Adicionais

### 6.1 Domínio Customizado (Opcional)

Se quiser usar um domínio próprio (ex: `www.cafedalulio.com.br`):

1. No Render, vá para o serviço
2. Clique em **Settings**
3. Procure por **Custom Domain**
4. Adicione seu domínio
5. Siga as instruções para configurar DNS

### 6.2 Variáveis de Ambiente Adicionais

Se precisar adicionar mais variáveis depois:

1. Vá para o serviço no Render
2. Clique em **Environment**
3. Clique em **Add Environment Variable**
4. Preencha e salve

O serviço será reiniciado automaticamente.

---

## 🐛 Solução de Problemas

### Erro: "Cannot connect to database"

**Solução:**
1. Verifique se a URL do banco está correta
2. Certifique-se que a senha não tem caracteres especiais (ou escape com `%20` para espaços)
3. Verifique se o banco está em execução no Render

### Erro: "Build failed"

**Solução:**
1. Verifique o log de build
2. Execute localmente: `pnpm build`
3. Se tiver erros, corrija e faça push novamente

### Erro: "Port 3000 already in use"

**Solução:**
O Render usa automaticamente a porta correta. Não mude nada.

### Site está lento ou não carrega

**Solução:**
1. Espere alguns minutos (plano free do Render pode ser lento)
2. Verifique o log de erros no Render
3. Reinicie o serviço: clique em **Restart** no Render

---

## 📊 Monitorar a Aplicação

### Logs em Tempo Real

1. No Render, clique no seu serviço
2. Vá para a aba **Logs**
3. Você verá todos os eventos em tempo real

### Métricas

1. Clique na aba **Metrics**
2. Veja CPU, memória e requisições

---

## 🔄 Atualizar a Aplicação

Sempre que fizer mudanças no código:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O Render detectará automaticamente a mudança e fará um novo deploy (5-10 minutos).

---

## 💾 Backup do Banco de Dados

### Exportar Dados

No Render, você pode fazer backup do banco:

1. Vá para o banco de dados
2. Clique em **Backups**
3. Clique em **Create Backup**

### Restaurar Dados

Se precisar restaurar:

1. Vá para **Backups**
2. Clique em **Restore** no backup desejado

---

## 📝 Checklist Final

- [ ] Conta criada no Render
- [ ] Banco de dados MySQL criado
- [ ] DATABASE_URL copiada
- [ ] Código enviado para GitHub
- [ ] Serviço criado no Render
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy concluído com sucesso
- [ ] Site acessível em https://cafe-da-julio.onrender.com
- [ ] Banco de dados funcionando
- [ ] Admin panel testado

---

## 🎉 Pronto!

Sua aplicação Café da Júlio está no ar! 

**URL de produção:** https://cafe-da-julio.onrender.com

**Próximos passos:**
1. Adicione itens de menu via admin panel
2. Configure seu número de WhatsApp
3. Compartilhe o link com clientes
4. Monitore os logs regularmente

---

## 📞 Suporte Render

Se tiver problemas:
- Documentação: https://render.com/docs
- Status: https://status.render.com
- Suporte: https://render.com/support

**Boa sorte! 🚀**
