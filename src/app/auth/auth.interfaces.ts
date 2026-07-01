export interface IRegistro {
    nombre: string,
    apellido: string,
    edad: number,
    email: string,
    password: string,
    admin: boolean,
}

export interface ILogin {
    email: string,
    password: string,
}