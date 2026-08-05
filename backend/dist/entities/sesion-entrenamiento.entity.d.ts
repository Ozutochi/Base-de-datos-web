import { Categoria } from './categoria.entity';
import { Asistencia } from './asistencia.entity';
export declare class SesionEntrenamiento {
    id: number;
    categoria_id: number;
    categoria: Categoria;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    lugar_cancha: string;
    asistencias: Asistencia[];
}
