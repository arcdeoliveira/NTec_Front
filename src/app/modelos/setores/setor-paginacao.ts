import { PaginacaoResposta } from "../comum/paginacao-resposta";
import { SetorConsulta } from "./setor-consulta";

export interface SetorPaginacao extends PaginacaoResposta {
    objetos: SetorConsulta[];
}