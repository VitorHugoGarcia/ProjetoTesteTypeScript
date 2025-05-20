import express from 'express';
import {
  cadastrarUsuario,
  editarUsuario,
  excluirUsuario,
  listarTodosUsuarios,
  login
} from '../controllers/usuarioController';
import {autenticarToken} from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.delete('/deletar', excluirUsuario);
router.put('/editar', editarUsuario)
router.get('/', listarTodosUsuarios);

router.post('/login', login);
router.get('/protegido', autenticarToken, (req, res) => {
  res.send("Você acessou uma rota protegida!");
})

export default router;