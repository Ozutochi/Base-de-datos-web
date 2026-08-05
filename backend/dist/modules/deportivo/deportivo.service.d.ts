import { Repository } from 'typeorm';
import { SesionEntrenamiento } from '../../entities/sesion-entrenamiento.entity';
import { Partido } from '../../entities/partido.entity';
import { Asistencia } from '../../entities/asistencia.entity';
import { CreateSesionDto, CreatePartidoDto, CreateAsistenciaDto } from './dto/deportivo.dtos';
export declare class DeportivoService {
    private readonly sesionRepo;
    private readonly partidoRepo;
    private readonly asistenciaRepo;
    constructor(sesionRepo: Repository<SesionEntrenamiento>, partidoRepo: Repository<Partido>, asistenciaRepo: Repository<Asistencia>);
    createSesion(dto: CreateSesionDto): Promise<SesionEntrenamiento>;
    findAllSesiones(): Promise<SesionEntrenamiento[]>;
    updateSesion(id: number, dto: any): Promise<SesionEntrenamiento>;
    removeSesion(id: number): Promise<void>;
    createPartido(dto: CreatePartidoDto): Promise<Partido>;
    findAllPartidos(): Promise<Partido[]>;
    updatePartido(id: number, dto: any): Promise<Partido>;
    removePartido(id: number): Promise<void>;
    registrarAsistencia(dto: CreateAsistenciaDto): Promise<Asistencia>;
    findAllAsistencias(): Promise<Asistencia[]>;
    updateAsistencia(id: number, dto: any): Promise<Asistencia>;
    removeAsistencia(id: number): Promise<void>;
}
