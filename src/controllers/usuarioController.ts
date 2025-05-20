import { Request, Response } from "express";
import { 
    criarUsuario, 
    deletarUsuario, 
    listarUsuarios, 
    buscarUsuarioPorCredeciais } from "../Model/Usuario";
import Jwt from "jsonwebtoken";
import { editarUsuarioService } from "../services/usuarioServices";

const key = process.env.JWT_SECRET || "padrao_secreto";

export const login = async (req: Request, res: Response) => {
    const {nome, senha} = req.body;

    try {

        const usuario = await buscarUsuarioPorCredeciais(nome, senha);
        
        if (!usuario) res.status(401).send(
            {
                message: "Credenciais inváidas!"
            }
        );

        const token = Jwt.sign({id: usuario.id, nome: usuario.nome}, key, {
            expiresIn: "1h"
        });

        res.send(
            {
                message: "Login bem-sucedido!!",
                token: token
            }
        );

    } catch (err) {
        
        res.status(500).send(
            { 
                message: "Erro ao realizar login!" 
            }
        );

        console.error("Erro ao realizar o login", err);

    }
}

export const cadastrarUsuario = async (req: Request, res: Response) => {

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