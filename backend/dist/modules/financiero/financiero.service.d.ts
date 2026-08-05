import { Repository } from 'typeorm';
import { Tarifa } from '../../entities/tarifa.entity';
import { Mensualidad } from '../../entities/mensualidad.entity';
import { Pago } from '../../entities/pago.entity';
import { CreateTarifaDto, CreateMensualidadDto, CreatePagoDto } from './dto/financiero.dtos';
export declare class FinancieroService {
    private readonly tarifaRepo;
    private readonly mensualidadRepo;
    private readonly pagoRepo;
    constructor(tarifaRepo: Repository<Tarifa>, mensualidadRepo: Repository<Mensualidad>, pagoRepo: Repository<Pago>);
    createTarifa(dto: CreateTarifaDto): Promise<Tarifa>;
    findAllTarifas(): Promise<Tarifa[]>;
    updateTarifa(id: number, dto: any): Promise<Tarifa>;
    removeTarifa(id: number): Promise<void>;
    createMensualidad(dto: CreateMensualidadDto): Promise<Mensualidad>;
    findAllMensualidades(): Promise<Mensualidad[]>;
    updateMensualidad(id: number, dto: any): Promise<Mensualidad>;
    removeMensualidad(id: number): Promise<void>;
    createPago(dto: CreatePagoDto): Promise<Pago>;
    findAllPagos(): Promise<Pago[]>;
    updatePago(id: number, dto: any): Promise<Pago>;
    removePago(id: number): Promise<void>;
}
