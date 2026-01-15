# Café da Júlio - Project TODO

## Core Features

### Phase 1: Database & Schema
- [x] Create menu items table with categories (daily, salgados, doces, marmitas)
- [x] Create orders table for order tracking
- [x] Create order items table for line items
- [x] Create availability status table for admin control
- [x] Create photo gallery table for location page
- [x] Set up database migrations

### Phase 2: Frontend Pages
- [x] Home page with café introduction and navigation
- [x] Orders page with daily items, salgados, and doces categories
- [x] Doppio Vermelho coffee section page
- [x] Marmitas Fit page with nature/leaf-themed design
- [x] Location page with photo gallery placeholder and Google Maps
- [x] Shopping cart UI with quantity management
- [x] Responsive design across all pages

### Phase 3: Admin Panel
- [x] Admin authentication and role-based access control
- [x] Barista dashboard for inventory management
- [x] Toggle availability for daily items
- [x] Toggle availability for salgados
- [x] Toggle availability for doces
- [x] Real-time availability updates

### Phase 4: Order System & WhatsApp
- [x] Shopping cart system with item accumulation
- [x] Quantity management for cart items
- [x] WhatsApp integration with pre-filled messages
- [x] Order formatting with all selected items
- [x] Pickup location notice in WhatsApp message
- [x] Order submission and tracking

### Phase 5: Location & Gallery
- [x] Google Maps integration showing Café da Júlio location in Farroupilha
- [x] Photo gallery section for café interior/exterior
- [ ] Cloud storage integration for photos (futuro)
- [ ] Photo upload functionality for admin (futuro)
- [x] Directions and location services

### Phase 6: Notifications & Polish
- [ ] Owner notifications on new orders (futuro)
- [ ] Inventory low-stock notifications (futuro)
- [ ] Email/WhatsApp notification system (futuro)
- [x] Final testing and bug fixes
- [x] Performance optimization

### Phase 7: Documentation
- [x] Deployment guide (Render/Firebase)
- [x] Barista operations manual
- [x] Admin panel user guide
- [x] Setup and maintenance documentation
- [ ] Interactive presentation/dashboard (futuro)

## Design Elements
- [x] Extract color palette from logo (brown/tan/beige tones)
- [x] Implement modern, clean aesthetic
- [x] Ensure responsive design for mobile/tablet/desktop
- [x] Create nature/leaf-themed design for Marmitas Fit section
- [x] Add visual feedback for item selection

## Testing & Quality
- [x] Unit tests for backend procedures
- [x] Integration tests for order flow
- [x] Admin panel functionality tests
- [x] WhatsApp integration testing
- [x] Mobile responsiveness testing

## Deployment
- [x] Prepare for Render deployment
- [x] Prepare for Firebase deployment
- [x] Set up environment variables
- [x] Configure database connection
- [x] Test production build


## Melhorias Solicitadas (v1.1)
- [x] Adicionar logo do Café da Júlio ao site
- [x] Ajustar tema para cores mais escuras (marrom/chocolate)
- [x] Melhorar contraste e legibilidade em tema escuro
- [x] Atualizar localização para Rua Julio de Castilhos, Centro, Farroupilha
- [x] Integrar coordenadas corretas no Google Maps


## Deployment no Render (v1.2)
- [ ] Criar banco de dados MySQL no Render
- [ ] Configurar variáveis de ambiente
- [ ] Deploy da aplicação no Render
- [ ] Testar integração com banco remoto


## PostgreSQL Migration (v1.3)
- [x] Atualizar schema para PostgreSQL
- [x] Atualizar connection string
- [x] Testar localmente com PostgreSQL
- [x] Atualizar guias de deployment


## Authentication Fix (v1.4)
- [x] Implementar login simples email/senha para baristas
- [x] Remover dependência de OAuth Manus
- [x] Criar tabela de credenciais de baristas
- [x] Proteger painel admin com autenticação
- [x] Testar login no Render
