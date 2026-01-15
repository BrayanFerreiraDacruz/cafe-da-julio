import "dotenv/config";
import { createBaristaCredential, getBaristaByEmail } from "./server/db";

async function main() {
  const email = "demo@cafe.com";
  const password = "demo123";
  const name = "Admin Café";

  console.log(`[Seed] Verificando se o usuário ${email} já existe...`);
  
  try {
    const existing = await getBaristaByEmail(email);
    
    if (existing) {
      console.log("[Seed] Usuário administrador já existe.");
    } else {
      console.log("[Seed] Criando usuário administrador...");
      await createBaristaCredential(email, password, name);
      console.log("[Seed] Usuário administrador criado com sucesso!");
      console.log(`[Seed] Email: ${email}`);
      console.log(`[Seed] Senha: ${password}`);
    }
  } catch (error) {
    console.error("[Seed] Erro ao executar seed:", error);
  } finally {
    process.exit(0);
  }
}

main();
