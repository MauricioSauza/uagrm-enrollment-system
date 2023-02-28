export interface ILectures {
    nombre: string,
    sigla: string,
    semestre: number,
    paralelos: IParallels[]
}

export interface IParallels {
    disabled: boolean,
    nombre:string,
    sigla: string,
    semestre: number,
    grupo: string,
    docente: string,
    cupos: number,
    horario: ISchedule[]
}

export interface ISchedule {
    dia: string,
    hora_inicio: string,
    hora_fin: string
}