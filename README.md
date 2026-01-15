# Café da Júlio - Sistema de Pedidos Online

Um site moderno e completo para o Café da Júlio em Farroupilha, com sistema de pedidos, cardápio de marmitas fit, painel administrativo para baristas e integração com WhatsApp.

## 🎯 Características Principais

### Para Clientes:

- **Home Page**: Apresentação do café com navegação intuitiva
- **Sistema de Pedidos**: Selecione itens de categorias (diários, salgados, doces)
- **Marmitas Fit**: Cardápio saudável com design temático de natureza
- **Doppio Vermelho**: Seção premium do café especial
- **Localização**: Mapa interativo e galeria de fotos
- **Integração WhatsApp**: Envie pedidos diretamente via WhatsApp

### Para Baristas/Gerentes:

- **Painel Administrativo**: Gerenciar disponibilidade de itens
- **Controle em Tempo Real**: Ative/desative itens conforme necessário
- **Autenticação Segura**: Acesso restrito com Manus OAuth
- **Notificações**: Receba pedidos via WhatsApp

## 🛠️ Stack Tecnológico

### Frontend:
- **React 19** com TypeScript
- **Tailwind CSS 4** para styling
- **Wouter** para roteamento
- **shadcn/ui** para componentes
- **Vite** para build

### Backend:
- **Express.js** para servidor HTTP
- **tRPC** para API type-safe
- **Drizzle ORM** para banco de dados
- **Manus OAuth** para autenticação

### Banco de Dados:
- **MySQL/TiDB** para persistência
- **Migrations automáticas** com Drizzle Kit

### Testes:
- **Vitest** para testes unitários
- **Cobertura completa** de rotas tRPC

## 📁 Estrutura do Projeto

```
cafe_da_julio/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── pages/            # Páginas principais
│   │   │   ├── Home.tsx      # Landing page
│   │   │   ├── Orders.tsx    # Sistema de pedidos
│   │   │   ├── MarmitasFit.tsx # Marmitas fit
│   │   │   ├── DoppioVermelho.tsx # Café premium
│   │   │   ├── Location.tsx  # Localização
│   │   │   └── AdminPanel.tsx # Painel admin
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── lib/trpc.ts       # Cliente tRPC
│   │   ├── App.tsx           # Roteador principal
│   │   └── index.css         # Estilos globais
│   └── public/               # Assets estáticos
│
├── server/                    # Backend Express
│   ├── routers.ts            # Definição de rotas tRPC
│   ├── db.ts                 # Funções de banco de dados
│   ├── auth.logout.test.ts   # Testes de autenticação
│   ├── menu.test.ts          # Testes de menu/admin
│   └── _core/                # Infraestrutura interna
│
├── drizzle/                   # Migrações do banco de dados
│   ├── schema.ts             # Definição de tabelas
│   └── migrations/           # Histórico de migrações
│
├── shared/                    # Código compartilhado
├── storage/                   # Integração S3
│
├── DEPLOYMENT.md             # Guia de deployment
├── BARISTA_MANUAL.md         # Manual para baristas
├── README.md                 # Este arquivo
└── package.json              # Dependências
```

## 🚀 Quick Start

### Instalação:

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/cafe-da-julio.git
cd cafe_da_julio

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais
```

### Desenvolvimento:

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Abra http://localhost:3000 no navegador
```

### Testes:

```bash
# Executar testes unitários
pnpm test

# Verificar tipos TypeScript
pnpm check
```

### Build para Produção:

```bash
# Compilar para produção
pnpm build

# Iniciar servidor em produção
pnpm start
```

## 📊 Banco de Dados

### Tabelas Principais:

| Tabela | Descrição |
|--------|-----------|
| `users` | Usuários do sistema (admin/user) |
| `menuItems` | Itens do cardápio com disponibilidade |
| `orders` | Pedidos dos clientes |
| `orderItems` | Itens dentro de cada pedido |
| `galleryPhotos` | Fotos da galeria do café |

### Inicializar Banco de Dados:

```bash
# Gerar e aplicar migrações
pnpm db:push
```

## 🔐 Autenticação

### Fluxo de Login:

1. Clique em "Login Admin" no site
2. Você será redirecionado para Manus OAuth
3. Após autenticação, você terá acesso ao painel admin
4. Apenas usuários com role `admin` podem gerenciar itens

### Variáveis de Ambiente Necessárias:

```
VITE_APP_ID=seu-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
JWT_SECRET=seu-secret-aleatorio
```

## 📱 Integração WhatsApp

### Como Funciona:

1. Cliente seleciona itens e clica "Enviar via WhatsApp"
2. Mensagem formatada é enviada para o número do café
3. Barista recebe pedido com todos os detalhes
4. Barista responde confirmando horário de retirada

### Configurar Número:

Edite o número do WhatsApp em:
- `client/src/pages/Orders.tsx` (linha ~150)
- `client/src/pages/MarmitasFit.tsx` (linha ~80)
- `client/src/pages/Location.tsx` (linha ~60)

Procure por: `https://wa.me/5554999999999`

## 🎨 Paleta de Cores

O site usa uma paleta de cores baseada na logo do Café da Júlio:

- **Primary**: Marrom/Tan (oklch(0.55 0.15 45))
- **Secondary**: Bege claro (oklch(0.75 0.10 45))
- **Accent**: Verde natural (oklch(0.65 0.12 45))
- **Background**: Branco/Creme (oklch(0.98 0.001 0))

Edite `client/src/index.css` para personalizar cores.

## 📝 Páginas e Funcionalidades

### Home (`/`)
- Landing page com apresentação do café
- Navegação para todas as seções
- Botões de ação principais

### Pedidos (`/pedidos`)
- Abas para Disponíveis do Dia, Salgados, Doces
- Carrinho de compras com quantidade
- Integração WhatsApp para envio de pedidos

### Marmitas Fit (`/marmitas`)
- Design temático com folhas/natureza
- Categorias: Frango, Carne/Suína, Sopas
- Seleção de itens e carrinho

### Doppio Vermelho (`/doppio`)
- Página premium do café especial
- Detalhes, características e notas de degustação
- Call-to-action para fazer pedido

### Localização (`/localizacao`)
- Google Maps integrado
- Informações de contato e horário
- Galeria de fotos (placeholder para futuras fotos)

### Painel Admin (`/admin`)
- Acesso restrito (apenas admin)
- Gerenciar disponibilidade por categoria
- Visualizar estatísticas de itens

## 🧪 Testes

### Executar Testes:

```bash
pnpm test
```

### Cobertura de Testes:

- ✅ Autenticação (logout)
- ✅ Menu (consulta por categoria)
- ✅ Admin (verificação de acesso)
- ✅ Pedidos (criar e consultar)
- ✅ Galeria (CRUD de fotos)

## 🚀 Deployment

### Render:

Veja [DEPLOYMENT.md](./DEPLOYMENT.md) para instruções completas.

```bash
git push origin main
# Deploy automático será acionado
```

### Firebase:

```bash
npm run build
firebase deploy
```

## 📚 Documentação

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guia completo de deployment
- **[BARISTA_MANUAL.md](./BARISTA_MANUAL.md)** - Manual para baristas
- **[API Documentation](./server/routers.ts)** - Documentação de rotas tRPC

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
pnpm install
pnpm build
```

### Erro: "Database connection failed"

- Verifique `DATABASE_URL` em `.env`
- Confirme que o banco de dados está acessível
- Execute `pnpm db:push` para criar tabelas

### Erro: "OAuth callback failed"

- Verifique `VITE_APP_ID` e `OAUTH_SERVER_URL`
- Confirme que o domínio está registrado no Manus

## 📞 Contato

- **Email**: contato@cafedalulio.com.br
- **WhatsApp**: (54) 99999-9999
- **Localização**: Farroupilha, RS

## 📄 Licença

Este projeto é propriedade do Café da Júlio. Todos os direitos reservados.

## 🤝 Contribuição

Para contribuir ao projeto:

1. Crie uma branch (`git checkout -b feature/sua-feature`)
2. Faça commit das mudanças (`git commit -m 'Add sua-feature'`)
3. Push para a branch (`git push origin feature/sua-feature`)
4. Abra um Pull Request

## ✨ Roadmap Futuro

- [ ] Sistema de avaliações de clientes
- [ ] Programa de fidelidade
- [ ] Integração com delivery
- [ ] App mobile nativo
- [ ] Sistema de agendamento
- [ ] Dashboard de analytics

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2024  
**Status:** ✅ Pronto para produção

Desenvolvido com ❤️ para o Café da Júlio
