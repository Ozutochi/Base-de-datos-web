import { EstadoUsuario } from '../../../entities/usuario.entity';
export declare class CreateUsuarioDto {
    rol_id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    correo: string;
    telefono?: string;
    password_hash: string;
    estado?: EstadoUsuario;
}
