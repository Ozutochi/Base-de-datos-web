import { FinancieroService } from './financiero.service';
import { CreateTarifaDto, CreateMensualidadDto, CreatePagoDto } from './dto/financiero.dtos';
export declare class FinancieroController {
    private readonly financieroService;
    constructor(financieroService: FinancieroService);
    createTarifa(dto: CreateTarifaDto): Promise<import("../../entities/tarifa.entity").Tarifa>;
    findAllTarifas(): Promise<import("../../entities/tarifa.entity").Tarifa[]>;
    updateTarifa(id: number, dto: any): Promise<import("../../entities/tarifa.entity").Tarifa>;
    removeTarifa(id: number): Promise<void>;
    createMensualidad(dto: CreateMensualidadDto): Promise<import("../../entities/mensualidad.entity").Mensualidad>;
    findAllMensualidades(): Promise<import("../../entities/mensualidad.entity").Mensualidad[]>;
    updateMensualidad(id: number, dto: any): Promise<import("../../entities/mensualidad.entity").Mensualidad>;
    removeMensualidad(id: number): Promise<void>;
    createPago(dto: CreatePagoDto): Promise<import("../../entities/pago.entity").Pago>;
    findAllPagos(): Promise<import("../../entities/pago.entity").Pago[]>;
    updatePago(id: number, dto: any): Promise<import("../../entities/pago.entity").Pago>;
    removePago(id: number): Promise<void>;
}
