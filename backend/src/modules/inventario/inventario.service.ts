import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from '../../entities/inventario.entity';
import { AsignacionEquipamiento } from '../../entities/asignacion-equipamiento.entity';
import { CreateInventarioDto, CreateAsignacionDto } from './dto/inventario.dtos';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private readonly inventarioRepo: Repository<Inventario>,
    @InjectRepository(AsignacionEquipamiento)
    private readonly asignacionRepo: Repository<AsignacionEquipamiento>,
  ) {}

  // --- INVENTARIO ---
  async createInventario(dto: CreateInventarioDto): Promise<Inventario> {
    return await this.inventarioRepo.save(this.inventarioRepo.create(dto));
  }
  async findAllInventarios(): Promise<Inventario[]> {
    return await this.inventarioRepo.find({ relations: { categoria: true, responsable: true } });
  }
  async updateInventario(id: number, dto: any): Promise<Inventario> {
    await this.inventarioRepo.update(id, dto);
    return this.inventarioRepo.findOne({ where: { id } }) as Promise<Inventario>;
  }
  async removeInventario(id: number): Promise<void> {
    await this.inventarioRepo.delete(id);
  }

  // --- ASIGNACIONES ---
  async createAsignacion(dto: CreateAsignacionDto): Promise<AsignacionEquipamiento> {
    return await this.asignacionRepo.save(this.asignacionRepo.create(dto));
  }
  async findAllAsignaciones(): Promise<AsignacionEquipamiento[]> {
    return await this.asignacionRepo.find({ relations: { estudiante: true, inventario: true } });
  }
  async updateAsignacion(id: number, dto: any): Promise<AsignacionEquipamiento> {
    await this.asignacionRepo.update(id, dto);
    return this.asignacionRepo.findOne({ where: { id } }) as Promise<AsignacionEquipamiento>;
  }
  async removeAsignacion(id: number): Promise<void> {
    await this.asignacionRepo.delete(id);
  }
}
