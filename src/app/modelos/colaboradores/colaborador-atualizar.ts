export interface ColaboradorAtualizar {
    id?: string | null;
    alteradoPor?: string;
    aniversario?: Date;
    cpf?: number;
    genero?: number;
    nome?: string; 
    sobreNome?: string;
    cargoId?: number
    chefeId?: string | null;
    setorId?: number;
}