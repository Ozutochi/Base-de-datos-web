import { SesionEntrenamiento } from './sesion-entrenamiento.entity';
import { Partido } from './partido.entity';
import { Estudiante } from './estudiante.entity';
export declare enum EstadoAsistencia {
    PRESENTE = "Presente",
    AUSENTE = "Ausente",
    JUSTIFICADO = "Justificado"
}
export declare class Asistencia {
    id: number;
    sesion_id: number;
    sesion: SesionEntrenamiento;
    partido_id: number;
    partido: Partido;
    estudiante_id: number;
    estudiante: Estudiante;
    estado_asistencia: EstadoAsistencia;
    observaciones: string;
}
