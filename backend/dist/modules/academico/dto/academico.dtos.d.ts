import { EstadoCategoria } from '../../../entities/categoria.entity';
import { EstadoPersonalCategoria } from '../../../entities/personal-categoria.entity';
export declare class CreateCategoriaDto {
    nombre: string;
    tipo_modalidad: string;
    edad_minima: number;
    edad_maxima: number;
    estado?: EstadoCategoria;
}
export declare class UpdateFichaMedicaDto {
    tipo_sangre?: string;
    alergias?: string;
    condiciones_preexistentes?: string;
    medicacion_actual?: string;
    contacto_emergencia_nombre?: string;
    contacto_emergencia_telefono?: string;
}
export declare class CreatePersonalCategoriaDto {
    categoria_id: number;
    usuario_id: number;
    cargo: string;
    fecha_asignacion: string;
    estado?: EstadoPersonalCategoria;
}
