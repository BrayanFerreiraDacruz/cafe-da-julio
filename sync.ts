import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './drizzle/schema';

const sql = postgres("postgresql://cafe_admin:lfFL9vOmyPqGAKMlXFeRLTRWRzyuSgsq@dpg-d5k4kere5dus73a00l80-a.oregon-postgres.render.com/cafedajulio");
const db = drizzle(sql, { schema });

async function main() {
  console.log("Tentando criar tabelas...");
  // Este comando tenta empurrar o schema de forma direta
  await sql`CREATE TABLE IF NOT EXISTS "menuItems" (id SERIAL PRIMARY KEY, name TEXT, category TEXT, price DECIMAL, "isAvailable" BOOLEAN DEFAULT TRUE)`;
  console.log("Tabela criada com sucesso!");
  process.exit(0);
}

main();