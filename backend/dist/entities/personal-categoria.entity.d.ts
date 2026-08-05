import { Categoria } from './categoria.entity';
import { Usuario } from './usuario.entity';
export declare enum EstadoPersonalCategoria {
    ACTIVO = "Activo",
    INACTIVO = "Inactivo"
}
export declare class PersonalCategoria {
    id: number;
    categoria_id: number;
    categoria: Categoria;
    usuario_id: number;
    usuario: Usuario;
    cargo: string;
    fecha_asignacion: string;
    estado: EstadoPersonalCategoria;
}
