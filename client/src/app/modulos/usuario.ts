export interface User {
    id?: string;
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    img: string;
    rol: string;
    password?: string;
    createAt?: string;
    sessionID?: string;
  }