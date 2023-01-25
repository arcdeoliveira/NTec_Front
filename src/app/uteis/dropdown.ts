import { Selecionador } from "../modelos/comum/selecionador";

export class dropdown {          
    static paginacao: number[] = [ 10, 15, 25, 50, 100 ];

    static genero: Selecionador[] = [
        {id: 2, nome: "Feminino"},
        {id: 1, nome: "Indefinido"},
        {id: 3, nome: "Masculino"},
        {id: 0, nome: "Não informado"}
    ]

    static escolha: Selecionador[] = [
        {id: true, nome: "sim"},
        {id: false, nome: "não"}
    ]
}