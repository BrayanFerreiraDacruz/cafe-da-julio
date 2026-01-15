import postgres from 'postgres';

// Usando sua URL externa que já sabemos que funciona
const connectionString = "postgresql://cafe_admin:lfFL9vOmyPqGAKMlXFeRLTRWRzyuSgsq@dpg-d5k4kere5dus73a00l80-a.oregon-postgres.render.com/cafedajulio?sslmode=require";
const sql = postgres(connectionString);

async function limparBanco() {
  console.log("🔥 Iniciando limpeza do banco de dados...");
  try {
    // Este comando apaga as tabelas conflitantes para o Drizzle recriar do zero
    await sql`DROP TABLE IF EXISTS "baristaCredentials", "galleryPhotos", "menuItems", "orderItems", "orders", "users", "__drizzle_migrations" CASCADE;`;
    console.log("✅ Tabelas removidas com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao limpar:", err);
  } finally {
    await sql.end();
    process.exit();
  }
}

limparBanco();