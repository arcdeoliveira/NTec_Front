export interface ColaboradorCadastro {
    aniversario?: Date;
    cpf?: number;
    genero?: number;
    nome?: string; 
    sobreNome?: string;
    cargoId?: number
    chefeId?: string | null;
    setorId?: number;
}