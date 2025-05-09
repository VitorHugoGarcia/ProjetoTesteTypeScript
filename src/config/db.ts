import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" })

export const pool = new Pool ({
    user: process.env.pg_usuario,
    host: "localhost",
    database: "Projeto Teste",
    password: process.env.pg_senha,
    port: 5432,
})

