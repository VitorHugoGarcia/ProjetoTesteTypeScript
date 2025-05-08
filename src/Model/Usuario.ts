import express, {Request, Response} from "express";
const route = express.Router();
import { usuarioPool } from "../Interfaces/IUsuario";
import { pool } from "../db";
import { Result } from "pg";

//Cadastro
route.post("/cadastro", async (req: Request<{}, {}, usuarioPool>, res:Response) =>{
    const {nome, senha} = req.body;

    try {
        
        const newUsuario = await pool.query(
            'INSERT INTO Usuario(nome, senha) VALUES($1, $2) RETURNING *', [nome, senha]
        )

        res.status(201).send({
            message: 'Usuario Criado com Sucesso!!!',
            userInfo: newUsuario.rows[0],
        });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

//Delete
route.delete("/deletar", async (req: Request, res: Response) => {

    const { id } = req.body;

        try {

            const deletar = await pool.query(
                "DELETE FROM Usuario WHERE id = $1 RETURNING *", [id]
            );

            if (deletar.rowCount === 0) {
                res.status(404).send({
                    message: "Usuario não encontrado!!!",
                    deletedUser: deletar.rows[0],
                });
            }

            res.status(200).send({
                message: "Usuário deletado com sucesso!",
                deletedUser: deletar.rows[0],
            });

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Erro ao deletar usuário" });
        }

})

//Listar
route.get("/", async (req: Request, res: Response) =>{

    try {

        const lista = await pool.query(
            "SELECT * FROM Usuario ORDER BY id"
        );
        res.status(200).send(lista.rows);

    } catch (error) {
        
        console.error("Erro ao listar os usuários!!!");
        res.status(500).send({ error: 'Erro ao buscar usuários' });

    }

})

module.exports = route;