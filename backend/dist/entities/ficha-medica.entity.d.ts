import { Estudiante } from './estudiante.entity';
export declare class FichaMedica {
    id: number;
    estudiante_id: number;
    estudiante: Estudiante;
    tipo_sangre: string;
    alergias: string;
    condiciones_preexistentes: string;
    medicacion_actual: string;
    contacto_emergencia_nombre: string;
    contacto_emergencia_telefono: string;
    fecha_actualizacion: string;
}
