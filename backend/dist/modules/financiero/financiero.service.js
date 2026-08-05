"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancieroService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tarifa_entity_1 = require("../../entities/tarifa.entity");
const mensualidad_entity_1 = require("../../entities/mensualidad.entity");
const pago_entity_1 = require("../../entities/pago.entity");
let FinancieroService = class FinancieroService {
    tarifaRepo;
    mensualidadRepo;
    pagoRepo;
    constructor(tarifaRepo, mensualidadRepo, pagoRepo) {
        this.tarifaRepo = tarifaRepo;
        this.mensualidadRepo = mensualidadRepo;
        this.pagoRepo = pagoRepo;
    }
    async createTarifa(dto) {
        return await this.tarifaRepo.save(this.tarifaRepo.create(dto));
    }
    async findAllTarifas() {
        return await this.tarifaRepo.find({ relations: { categoria: true } });
    }
    async updateTarifa(id, dto) {
        await this.tarifaRepo.update(id, dto);
        return this.tarifaRepo.findOne({ where: { id } });
    }
    async removeTarifa(id) {
        await this.tarifaRepo.delete(id);
    }
    async createMensualidad(dto) {
        return await this.mensualidadRepo.save(this.mensualidadRepo.create(dto));
    }
    async findAllMensualidades() {
        return await this.mensualidadRepo.find({ relations: { estudiante: true, tarifa: true } });
    }
    async updateMensualidad(id, dto) {
        await this.mensualidadRepo.update(id, dto);
        return this.mensualidadRepo.findOne({ where: { id } });
    }
    async removeMensualidad(id) {
        await this.mensualidadRepo.delete(id);
    }
    async createPago(dto) {
        const pago = await this.pagoRepo.save(this.pagoRepo.create(dto));
        if (pago.estado_pago === pago_entity_1.EstadoPago.APROBADO) {
            await this.mensualidadRepo.update(pago.mensualidad_id, { estado: mensualidad_entity_1.EstadoMensualidad.PAGADA });
        }
        return pago;
    }
    async findAllPagos() {
        return await this.pagoRepo.find({ relations: { representante: true, mensualidad: true, verificador: true } });
    }
    async updatePago(id, dto) {
        await this.pagoRepo.update(id, dto);
        const pago = await this.pagoRepo.findOne({ where: { id } });
        if (!pago) {
            throw new common_1.NotFoundException(`Pago #${id} no encontrado`);
        }
        if (pago.estado_pago === pago_entity_1.EstadoPago.APROBADO) {
            await this.mensualidadRepo.update(pago.mensualidad_id, { estado: mensualidad_entity_1.EstadoMensualidad.PAGADA });
        }
        else {
            await this.mensualidadRepo.update(pago.mensualidad_id, { estado: mensualidad_entity_1.EstadoMensualidad.PENDIENTE });
        }
        return pago;
    }
    async removePago(id) {
        await this.pagoRepo.delete(id);
    }
};
exports.FinancieroService = FinancieroService;
exports.FinancieroService = FinancieroService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tarifa_entity_1.Tarifa)),
    __param(1, (0, typeorm_1.InjectRepository)(mensualidad_entity_1.Mensualidad)),
    __param(2, (0, typeorm_1.InjectRepository)(pago_entity_1.Pago)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FinancieroService);
//# sourceMappingURL=financiero.service.js.map