import { PaginacaoResposta } from "../comum/paginacao-resposta";
import { CargoConsulta } from "./cargo-consulta";

export interface CargoPaginacao extends PaginacaoResposta {
    objetos: CargoConsulta[];
}