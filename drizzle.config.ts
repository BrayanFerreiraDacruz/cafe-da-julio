import { defineConfig } from "drizzle-kit";

// URL externa para garantir acesso do seu computador local ao Render
const connectionString = "postgresql://cafe_admin:lfFL9vOmyPqGAKMlXFeRLTRWRzyuSgsq@dpg-d5k4kere5dus73a00l80-a.oregon-postgres.render.com/cafedajulio";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // Adicionamos estas linhas para tornar a conexão mais estável e verbosa
  verbose: true,
  strict: true,
  dbCredentials: {
    url: connectionString,
  },
});