import { PaginacaoResposta } from "../comum/paginacao-resposta";
import { ColaboradorConsulta } from "./colaborador-consulta";

export interface ColaboradorPaginacao extends PaginacaoResposta {
    objetos: ColaboradorConsulta[];
}