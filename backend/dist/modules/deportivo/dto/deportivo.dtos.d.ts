import { EstadoPartido } from '../../../entities/partido.entity';
import { EstadoAsistencia } from '../../../entities/asistencia.entity';
export declare class CreateSesionDto {
    categoria_id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    lugar_cancha: string;
}
export declare class CreatePartidoDto {
    categoria_id: number;
    fecha: string;
    hora: string;
    equipo_rival: string;
    lugar_cancha: string;
    estado_partido?: EstadoPartido;
    goles_nuestros?: number;
    goles_rival?: number;
}
export declare class CreateAsistenciaDto {
    sesion_id?: number;
    partido_id?: number;
    estudiante_id: number;
    estado_asistencia: EstadoAsistencia;
    observaciones?: string;
}
