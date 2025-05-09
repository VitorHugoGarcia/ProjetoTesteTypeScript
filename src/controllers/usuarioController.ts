import { Request, Response } from "express";
import { criarUsuario, deletarUsuario, listarUsuarios } from "../Model/Usuario";
import { editarUsuarioService } from "../services/usuarioServices";

export const cadastrarUsuario = async (req: Request, res: Response) => {

    console.log("REQ BODY:", req.body);

    const { nome, senha } = req.body;

    try {

        const usuarioCriado = await criarUsuario({ nome, senha });

        res.status(201).send({
        message: 'Usuário criado com sucesso!',
        userInfo: usuarioCriado,
        });

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send({ error: 'Erro ao cadastrar usuário' });
    }

};

export const excluirUsuario = async (req: Request, res: Response) => {
    const { id } = req.body;
  
    try {
      const deletar = await deletarUsuario(id);
  
      if (deletar.rowCount === 0) {
        res.status(404).send({
            message: 'Usuário não encontrado!',
        });
      }
  
      res.status(200).send({
        message: 'Usuário deletado com sucesso!',
        deletedUser: deletar.rows[0],
      });

    } catch (error) {

        console.error('Erro ao deletar usuário:', error);
        res.status(500).send({ error: 'Erro ao deletar usuário' });

    }
};
  
export const listarTodosUsuarios = async (req: Request, res: Response) => {

    try {
      const usuarios = await listarUsuarios();
      res.status(200).send(usuarios);

    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).send({ error: 'Erro ao buscar usuários' });
    }

};

export const editarUsuario = async (req: Request, res: Response) => {

    const { id, nome, senha } = req.body;

    try {
        
        const editar = await editarUsuarioService(id, { nome, senha });

        if(!editar){
            res.status(404).send({
                message: "Usuario não encontrado!!!"
            })
        }

        res.status(200).send({
            message: "Usuário atualizado com sucesso!",
            updatedUser: editar,
        })

    } catch (error) {
        
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).send({ 
            error: "Erro ao atualizar o usuário." 
        });
    }

};