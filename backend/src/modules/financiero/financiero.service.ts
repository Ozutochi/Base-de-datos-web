import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarifa } from '../../entities/tarifa.entity';
import { Mensualidad, EstadoMensualidad } from '../../entities/mensualidad.entity';
import { Pago, EstadoPago } from '../../entities/pago.entity';
import { CreateTarifaDto, CreateMensualidadDto, CreatePagoDto } from './dto/financiero.dtos';

@Injectable()
export class FinancieroService {
  constructor(
    @InjectRepository(Tarifa)
    private readonly tarifaRepo: Repository<Tarifa>,
    @InjectRepository(Mensualidad)
    private readonly mensualidadRepo: Repository<Mensualidad>,
    @InjectRepository(Pago)
    private readonly pagoRepo: Repository<Pago>,
  ) {}

  // --- TARIFAS ---
  async createTarifa(dto: CreateTarifaDto): Promise<Tarifa> {
    return await this.tarifaRepo.save(this.tarifaRepo.create(dto));
  }
  async findAllTarifas(): Promise<Tarifa[]> {
    return await this.tarifaRepo.find({ relations: { categoria: true } });
  }
  async updateTarifa(id: number, dto: any): Promise<Tarifa> {
    await this.tarifaRepo.update(id, dto);
    return this.tarifaRepo.findOne({ where: { id } }) as Promise<Tarifa>;
  }
  async removeTarifa(id: number): Promise<void> {
    await this.tarifaRepo.delete(id);
  }

  // --- MENSUALIDADES ---
  async createMensualidad(dto: CreateMensualidadDto): Promise<Mensualidad> {
    return await this.mensualidadRepo.save(this.mensualidadRepo.create(dto));
  }
  async findAllMensualidades(): Promise<Mensualidad[]> {
    return await this.mensualidadRepo.find({ relations: { estudiante: true, tarifa: true } });
  }
  async updateMensualidad(id: number, dto: any): Promise<Mensualidad> {
    await this.mensualidadRepo.update(id, dto);
    return this.mensualidadRepo.findOne({ where: { id } }) as Promise<Mensualidad>;
  }
  async removeMensualidad(id: number): Promise<void> {
    await this.mensualidadRepo.delete(id);
  }

  // --- PAGOS ---
  async createPago(dto: CreatePagoDto): Promise<Pago> {
    const pago = await this.pagoRepo.save(this.pagoRepo.create(dto));
    if (pago.estado_pago === EstadoPago.APROBADO) {
      await this.mensualidadRepo.update(pago.mensualidad_id, { estado: EstadoMensualidad.PAGADA });
    }
    return pago;
  }
  async findAllPagos(): Promise<Pago[]> {
    return await this.pagoRepo.find({ relations: { representante: true, mensualidad: true, verificador: true } });
  }
  async updatePago(id: number, dto: any): Promise<Pago> {
    await this.pagoRepo.update(id, dto);
    const pago = await this.pagoRepo.findOne({ where: { id } });
    if (!pago) {
      throw new NotFoundException(`Pago #${id} no encontrado`);
    }
    if (pago.estado_pago === EstadoPago.APROBADO) {
      await this.mensualidadRepo.update(pago.mensualidad_id, { estado: EstadoMensualidad.PAGADA });
    } else {
      await this.mensualidadRepo.update(pago.mensualidad_id, { estado: EstadoMensualidad.PENDIENTE });
    }
    return pago;
  }
  async removePago(id: number): Promise<void> {
    await this.pagoRepo.delete(id);
  }
}
