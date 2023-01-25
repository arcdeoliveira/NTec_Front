import { Paginacao } from "../comum/paginacao";

export interface ColaboradorFiltro extends Paginacao {
    nome: string
    cpf?: number;
    genero?: number | null;
    cargoId?: number | null;
    chefe?: boolean | null;
    setorId?: number | null;
}