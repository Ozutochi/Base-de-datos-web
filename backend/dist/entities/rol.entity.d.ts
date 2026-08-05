import { Usuario } from './usuario.entity';
export declare enum EstadoRol {
    ACTIVO = "Activo",
    INACTIVO = "Inactivo"
}
export declare class Rol {
    id: number;
    nombre_rol: string;
    descripcion: string;
    estado: EstadoRol;
    usuarios: Usuario[];
}
