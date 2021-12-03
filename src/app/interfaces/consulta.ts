export interface Consulta {
    idPaciente?: string,
    nomePaciente?: string,
    idMedico?: string,
    idEspecialidade?:string,
    idClinica?: string,
    dataConsulta?:Date,
    observacoes?:string,
    dependente?: boolean,
}
