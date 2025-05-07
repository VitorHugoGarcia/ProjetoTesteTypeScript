import { Pool } from "pg";

export const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    database: "Projeto Teste",
    password: "postgres",
    port: 5432,
})

