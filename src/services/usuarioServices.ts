import { editarUsuarios } from "../Model/Usuario";

export async function editarUsuarioService(
  id: number,
  campos: { nome?: string; senha?: string }
) {

  if (!campos.nome && !campos.senha) {
    return null;
  }

  return await editarUsuarios(id, campos);
}