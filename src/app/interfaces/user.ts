export interface User {
  id?: string,
  name?: string;
  email?: string;
  password?: string;
  telefone?: string,
  rg?: string,
  cpf?: string,
  orgemissor?: number,
  dtemissao?: Date,
  uf?: string,
  dtnascimento?: Date,
  tituloeleitor?: string,
  tipoUser?: number,
}
