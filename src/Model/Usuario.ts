import { usuarioPool } from "../Interfaces/IUsuario";
import { pool } from "../config/db";

export const criarUsuario = async ({ nome, senha }: usuarioPool) => {
    
    const novoUsuario = await pool.query(
      'INSERT INTO Usuario(nome, senha) VALUES($1, $2) RETURNING *',
      [nome, senha]
    );

    return novoUsuario.rows[0];

};
  
export const deletarUsuario = async (id: number) => {

    const deletar = await pool.query(
      'DELETE FROM Usuario WHERE id = $1 RETURNING *',
      [id]
    );

    return deletar;

};
  
export const listarUsuarios = async () => {

    const lista = await pool.query('SELECT * FROM Usuario ORDER BY id');

    return lista.rows;

};

export const buscarUsuarioPorCredeciais = async (
    nome: string, 
    senha: string) => {

        const usuario = await pool.query(
            "SELECT * FROM Usuario WHERE nome = $1 AND senha = $2",
            [nome, senha]
        );

        return usuario.rows[0];
    };

export const editarUsuarios = async (
    id: number, campos: { 
        nome?: string, senha?: string 
    }) => {

        const keys = Object.keys(campos);
        const values = Object.values(campos);

        // Monta query dinâmica
        const sets = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
        const query = `UPDATE Usuario SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`;

        try {
            const resultado = await pool.query(query, [...values, id]);
            return resultado.rows[0];
        } catch (err) {
            throw err;
        }

    }