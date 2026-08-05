import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SesionEntrenamiento } from '../../entities/sesion-entrenamiento.entity';
import { Partido } from '../../entities/partido.entity';
import { Asistencia } from '../../entities/asistencia.entity';
import { CreateSesionDto, CreatePartidoDto, CreateAsistenciaDto } from './dto/deportivo.dtos';

@Injectable()
export class DeportivoService {
  constructor(
    @InjectRepository(SesionEntrenamiento)
    private readonly sesionRepo: Repository<SesionEntrenamiento>,
    @InjectRepository(Partido)
    private readonly partidoRepo: Repository<Partido>,
    @InjectRepository(Asistencia)
    private readonly asistenciaRepo: Repository<Asistencia>,
  ) {}

  // --- SESIONES ---
  async createSesion(dto: CreateSesionDto): Promise<SesionEntrenamiento> {
    return await this.sesionRepo.save(this.sesionRepo.create(dto));
  }
  async findAllSesiones(): Promise<SesionEntrenamiento[]> {
    return await this.sesionRepo.find({ relations: { categoria: true } });
  }
  async updateSesion(id: number, dto: any): Promise<SesionEntrenamiento> {
    await this.sesionRepo.update(id, dto);
    return this.sesionRepo.findOne({ where: { id } }) as Promise<SesionEntrenamiento>;
  }
  async removeSesion(id: number): Promise<void> {
    await this.sesionRepo.delete(id);
  }

  // --- PARTIDOS ---
  async createPartido(dto: CreatePartidoDto): Promise<Partido> {
    return await this.partidoRepo.save(this.partidoRepo.create(dto));
  }
  async findAllPartidos(): Promise<Partido[]> {
    return await this.partidoRepo.find({ relations: { categoria: true } });
  }
  async updatePartido(id: number, dto: any): Promise<Partido> {
    await this.partidoRepo.update(id, dto);
    return this.partidoRepo.findOne({ where: { id } }) as Promise<Partido>;
  }
  async removePartido(id: number): Promise<void> {
    await this.partidoRepo.delete(id);
  }

  // --- ASISTENCIA ---
  async registrarAsistencia(dto: CreateAsistenciaDto): Promise<Asistencia> {
    // Validar arco exclusivo: o tiene sesion_id o partido_id, pero no ambos ni ninguno
    if (dto.sesion_id && dto.partido_id) {
      throw new BadRequestException('La asistencia no puede estar vinculada a una sesión y a un partido al mismo tiempo.');
    }
    if (!dto.sesion_id && !dto.partido_id) {
      throw new BadRequestException('Debe especificar la sesión o el partido de la asistencia.');
    }
    return await this.asistenciaRepo.save(this.asistenciaRepo.create(dto));
  }
  async findAllAsistencias(): Promise<Asistencia[]> {
    return await this.asistenciaRepo.find({ relations: { estudiante: true, sesion: true, partido: true } });
  }
  async updateAsistencia(id: number, dto: any): Promise<Asistencia> {
    await this.asistenciaRepo.update(id, dto);
    return this.asistenciaRepo.findOne({ where: { id } }) as Promise<Asistencia>;
  }
  async removeAsistencia(id: number): Promise<void> {
    await this.asistenciaRepo.delete(id);
  }
}
