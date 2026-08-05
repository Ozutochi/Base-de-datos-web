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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const estudiante_entity_1 = require("../../entities/estudiante.entity");
const pago_entity_1 = require("../../entities/pago.entity");
const inventario_entity_1 = require("../../entities/inventario.entity");
const asignacion_equipamiento_entity_1 = require("../../entities/asignacion-equipamiento.entity");
const partido_entity_1 = require("../../entities/partido.entity");
const mensualidad_entity_1 = require("../../entities/mensualidad.entity");
let DashboardService = class DashboardService {
    estudianteRepo;
    pagoRepo;
    inventarioRepo;
    asignacionRepo;
    partidoRepo;
    mensualidadRepo;
    constructor(estudianteRepo, pagoRepo, inventarioRepo, asignacionRepo, partidoRepo, mensualidadRepo) {
        this.estudianteRepo = estudianteRepo;
        this.pagoRepo = pagoRepo;
        this.inventarioRepo = inventarioRepo;
        this.asignacionRepo = asignacionRepo;
        this.partidoRepo = partidoRepo;
        this.mensualidadRepo = mensualidadRepo;
    }
    async getMetrics() {
        const totalEstudiantes = await this.estudianteRepo.count({
            where: { estado: 'Activo' },
        });
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];
        const pagos = await this.pagoRepo.find({
            where: {
                estado_pago: pago_entity_1.EstadoPago.APROBADO,
                fecha_pago: (0, typeorm_2.Between)(firstDay, lastDay),
            },
        });
        let totalIngresosMes = 0;
        pagos.forEach(p => {
            totalIngresosMes += Number(p.monto_pagado);
        });
        const equiposPrestados = await this.asignacionRepo.count({
            where: { estado: asignacion_equipamiento_entity_1.EstadoAsignacion.ASIGNADO },
        });
        const inventarioCritico = await this.inventarioRepo.count({
            where: { estado_fisico: (0, typeorm_2.In)([inventario_entity_1.EstadoFisico.MALO, inventario_entity_1.EstadoFisico.REGULAR]) },
        });
        const today = new Date().toISOString().split('T')[0];
        const proximosPartidos = await this.partidoRepo.find({
            where: {
                fecha: (0, typeorm_2.MoreThanOrEqual)(today),
                estado_partido: partido_entity_1.EstadoPartido.PROGRAMADO
            },
            order: { fecha: 'ASC', hora: 'ASC' },
            take: 3,
            relations: { categoria: true }
        });
        const deudasPendientes = await this.mensualidadRepo.find({
            where: { estado: (0, typeorm_2.In)([mensualidad_entity_1.EstadoMensualidad.PENDIENTE, mensualidad_entity_1.EstadoMensualidad.VENCIDA]) },
            order: { anio: 'ASC', mes: 'ASC' },
            take: 5,
            relations: { estudiante: true, tarifa: true }
        });
        return {
            totalEstudiantes,
            totalIngresosMes,
            equiposPrestados,
            inventarioCritico,
            proximosPartidos,
            deudasPendientes
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estudiante_entity_1.Estudiante)),
    __param(1, (0, typeorm_1.InjectRepository)(pago_entity_1.Pago)),
    __param(2, (0, typeorm_1.InjectRepository)(inventario_entity_1.Inventario)),
    __param(3, (0, typeorm_1.InjectRepository)(asignacion_equipamiento_entity_1.AsignacionEquipamiento)),
    __param(4, (0, typeorm_1.InjectRepository)(partido_entity_1.Partido)),
    __param(5, (0, typeorm_1.InjectRepository)(mensualidad_entity_1.Mensualidad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map