import { DeportivoService } from './deportivo.service';
import { CreateSesionDto, CreatePartidoDto, CreateAsistenciaDto } from './dto/deportivo.dtos';
export declare class DeportivoController {
    private readonly deportivoService;
    constructor(deportivoService: DeportivoService);
    createSesion(dto: CreateSesionDto): Promise<import("../../entities/sesion-entrenamiento.entity").SesionEntrenamiento>;
    findAllSesiones(): Promise<import("../../entities/sesion-entrenamiento.entity").SesionEntrenamiento[]>;
    updateSesion(id: number, dto: any): Promise<import("../../entities/sesion-entrenamiento.entity").SesionEntrenamiento>;
    removeSesion(id: number): Promise<void>;
    createPartido(dto: CreatePartidoDto): Promise<import("../../entities/partido.entity").Partido>;
    findAllPartidos(): Promise<import("../../entities/partido.entity").Partido[]>;
    updatePartido(id: number, dto: any): Promise<import("../../entities/partido.entity").Partido>;
    removePartido(id: number): Promise<void>;
    registrarAsistencia(dto: CreateAsistenciaDto): Promise<import("../../entities/asistencia.entity").Asistencia>;
    findAllAsistencias(): Promise<import("../../entities/asistencia.entity").Asistencia[]>;
    updateAsistencia(id: number, dto: any): Promise<import("../../entities/asistencia.entity").Asistencia>;
    removeAsistencia(id: number): Promise<void>;
}
