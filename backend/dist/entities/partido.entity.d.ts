import { Categoria } from './categoria.entity';
import { Asistencia } from './asistencia.entity';
export declare enum EstadoPartido {
    PROGRAMADO = "Programado",
    JUGADO = "Jugado",
    SUSPENDIDO = "Suspendido"
}
export declare class Partido {
    id: number;
    categoria_id: number;
    categoria: Categoria;
    fecha: string;
    hora: string;
    equipo_rival: string;
    lugar_cancha: string;
    estado_partido: EstadoPartido;
    goles_nuestros: number;
    goles_rival: number;
    asistencias: Asistencia[];
}
