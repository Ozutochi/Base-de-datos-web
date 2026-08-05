import { Estudiante } from './estudiante.entity';
export declare class FichaMedica {
    id: number;
    estudiante_id: number;
    estudiante: Estudiante;
    tipo_sangre: string;
    alergias: string;
    condiciones_medicas: string;
    nombre_pediatra: string;
    fecha_actualizacion: string;
}
