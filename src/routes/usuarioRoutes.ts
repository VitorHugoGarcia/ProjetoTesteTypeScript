import express from 'express';
import {
  cadastrarUsuario,
  editarUsuario,
  excluirUsuario,
  listarTodosUsuarios,
} from '../controllers/usuarioController';

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.delete('/deletar', excluirUsuario);
router.put('/editar', editarUsuario)
router.get('/', listarTodosUsuarios);

export default router;