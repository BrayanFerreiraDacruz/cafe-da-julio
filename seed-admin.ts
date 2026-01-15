import "dotenv/config";
import { createBaristaCredential, getBaristaByEmail, createMenuItem, getAllMenuItems } from "./server/db";

async function main() {
  // 1. Garantir usuário Admin
  const email = "demo@cafe.com";
  const password = "demo123";
  const name = "Admin Café";

  console.log(`[Seed] Verificando se o usuário ${email} já existe...`);
  try {
    const existing = await getBaristaByEmail(email);
    if (!existing) {
      console.log("[Seed] Criando usuário administrador...");
      await createBaristaCredential(email, password, name);
    } else {
      console.log("[Seed] Usuário administrador já existe.");
    }
  } catch (e) {
    console.error("[Seed] Erro ao criar admin:", e);
  }

  // 2. Adicionar Itens de Menu
  console.log("[Seed] Verificando itens de menu...");
  const existingItems = await getAllMenuItems();
  
  if (existingItems.length > 5) {
    console.log("[Seed] Itens de menu já parecem estar cadastrados.");
    process.exit(0);
  }

  const items = [
    // DOCES TRADICIONAIS
    { name: "Bolo de Cenoura com Chocolate", category: "doces", price: "12.00", description: "Fatia generosa com cobertura de chocolate" },
    { name: "Brownie de Chocolate Belga", category: "doces", price: "10.00", description: "Macio por dentro e crocante por fora" },
    { name: "Cookie de Gotas de Chocolate", category: "doces", price: "8.00", description: "Receita tradicional americana" },
    { name: "Torta de Limão", category: "doces", price: "14.00", description: "Refrescante e equilibrada" },
    { name: "Pudim de Leite Condensado", category: "doces", price: "9.00", description: "O clássico que todo mundo ama" },

    // SALGADOS TRADICIONAIS
    { name: "Pão de Queijo Mineiro", category: "salgados", price: "5.00", description: "Sempre quentinho" },
    { name: "Coxinha de Frango com Catupiry", category: "salgados", price: "8.50", description: "A favorita da casa" },
    { name: "Empada de Palmito", category: "salgados", price: "7.50", description: "Massa que derrete na boca" },
    { name: "Quiche de Alho Poró", category: "salgados", price: "12.00", description: "Opção leve e saborosa" },
    { name: "Enroladinho de Presunto e Queijo", category: "salgados", price: "7.00", description: "Clássico e prático" },

    // MARMITAS DE FRANGO
    { name: "Frango com Puré de Batata Doce e Brócolos", category: "marmitas_frango", price: "22.00", description: "Opção fit completa" },
    { name: "Frango com Arroz Integral e Legumes", category: "marmitas_frango", price: "22.00", description: "Equilíbrio e sabor" },
    { name: "Frango Xadrez Fit com Mix de Grãos", category: "marmitas_frango", price: "24.00", description: "Toque oriental saudável" },
    { name: "Strogonoff de Frango (Creme de Leite Light) com Arroz", category: "marmitas_frango", price: "23.00", description: "Confort food na versão light" },

    // MARMITAS DE CARNE
    { name: "Patinho Moído com Arroz e Feijão Preto", category: "marmitas_carne", price: "25.00", description: "O clássico brasileiro" },
    { name: "Carne de Panela com Mandioca e Cenoura", category: "marmitas_carne", price: "26.00", description: "Sabor de casa" },
    { name: "Almôndegas de Carne com Esparguete Integral", category: "marmitas_carne", price: "24.00", description: "Massa integral com molho artesanal" },
    { name: "Escondidinho de Carne Moída com Puré de Abóbora", category: "marmitas_carne", price: "25.00", description: "Baixo carboidrato e muito sabor" },

    // SOPAS E CALDOS
    { name: "Creme de Mandioquinha com Carne Desfiada", category: "sopas", price: "18.00", description: "Cremoso e nutritivo" },
    { name: "Canja de Galinha Integral", category: "sopas", price: "16.00", description: "Leve e reconfortante" },
    { name: "Sopa de Legumes com Músculo", category: "sopas", price: "17.00", description: "Rica em vitaminas" },
    { name: "Caldo Verde Fit (com Couve e Chouriço Light)", category: "sopas", price: "19.00", description: "Versão saudável do clássico português" },
  ];

  console.log(`[Seed] Cadastrando ${items.length} itens de menu...`);
  for (const item of items) {
    try {
      await createMenuItem(item);
    } catch (e) {
      console.error(`[Seed] Erro ao criar item ${item.name}:`, e);
    }
  }

  console.log("[Seed] Finalizado com sucesso!");
  process.exit(0);
}

main();
