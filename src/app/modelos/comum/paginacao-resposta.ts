import { Paginacao } from "./paginacao";

export interface PaginacaoResposta {
    mensagem: string;
    total: number;
    paginacao: Paginacao
}