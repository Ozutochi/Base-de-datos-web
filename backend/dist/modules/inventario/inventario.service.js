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
exports.InventarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventario_entity_1 = require("../../entities/inventario.entity");
const asignacion_equipamiento_entity_1 = require("../../entities/asignacion-equipamiento.entity");
let InventarioService = class InventarioService {
    inventarioRepo;
    asignacionRepo;
    constructor(inventarioRepo, asignacionRepo) {
        this.inventarioRepo = inventarioRepo;
        this.asignacionRepo = asignacionRepo;
    }
    async createInventario(dto) {
        return await this.inventarioRepo.save(this.inventarioRepo.create(dto));
    }
    async findAllInventarios() {
        return await this.inventarioRepo.find({ relations: { categoria: true, responsable: true } });
    }
    async updateInventario(id, dto) {
        await this.inventarioRepo.update(id, dto);
        return this.inventarioRepo.findOne({ where: { id } });
    }
    async removeInventario(id) {
        await this.inventarioRepo.delete(id);
    }
    async createAsignacion(dto) {
        return await this.asignacionRepo.save(this.asignacionRepo.create(dto));
    }
    async findAllAsignaciones() {
        return await this.asignacionRepo.find({ relations: { estudiante: true, inventario: true } });
    }
    async updateAsignacion(id, dto) {
        await this.asignacionRepo.update(id, dto);
        return this.asignacionRepo.findOne({ where: { id } });
    }
    async removeAsignacion(id) {
        await this.asignacionRepo.delete(id);
    }
};
exports.InventarioService = InventarioService;
exports.InventarioService = InventarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventario_entity_1.Inventario)),
    __param(1, (0, typeorm_1.InjectRepository)(asignacion_equipamiento_entity_1.AsignacionEquipamiento)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], InventarioService);
//# sourceMappingURL=inventario.service.js.map