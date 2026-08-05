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
exports.DeportivoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sesion_entrenamiento_entity_1 = require("../../entities/sesion-entrenamiento.entity");
const partido_entity_1 = require("../../entities/partido.entity");
const asistencia_entity_1 = require("../../entities/asistencia.entity");
let DeportivoService = class DeportivoService {
    sesionRepo;
    partidoRepo;
    asistenciaRepo;
    constructor(sesionRepo, partidoRepo, asistenciaRepo) {
        this.sesionRepo = sesionRepo;
        this.partidoRepo = partidoRepo;
        this.asistenciaRepo = asistenciaRepo;
    }
    async createSesion(dto) {
        return await this.sesionRepo.save(this.sesionRepo.create(dto));
    }
    async findAllSesiones() {
        return await this.sesionRepo.find({ relations: { categoria: true } });
    }
    async updateSesion(id, dto) {
        await this.sesionRepo.update(id, dto);
        return this.sesionRepo.findOne({ where: { id } });
    }
    async removeSesion(id) {
        await this.sesionRepo.delete(id);
    }
    async createPartido(dto) {
        return await this.partidoRepo.save(this.partidoRepo.create(dto));
    }
    async findAllPartidos() {
        return await this.partidoRepo.find({ relations: { categoria: true } });
    }
    async updatePartido(id, dto) {
        await this.partidoRepo.update(id, dto);
        return this.partidoRepo.findOne({ where: { id } });
    }
    async removePartido(id) {
        await this.partidoRepo.delete(id);
    }
    async registrarAsistencia(dto) {
        if (dto.sesion_id && dto.partido_id) {
            throw new common_1.BadRequestException('La asistencia no puede estar vinculada a una sesión y a un partido al mismo tiempo.');
        }
        if (!dto.sesion_id && !dto.partido_id) {
            throw new common_1.BadRequestException('Debe especificar la sesión o el partido de la asistencia.');
        }
        return await this.asistenciaRepo.save(this.asistenciaRepo.create(dto));
    }
    async findAllAsistencias() {
        return await this.asistenciaRepo.find({ relations: { estudiante: true, sesion: true, partido: true } });
    }
    async updateAsistencia(id, dto) {
        await this.asistenciaRepo.update(id, dto);
        return this.asistenciaRepo.findOne({ where: { id } });
    }
    async removeAsistencia(id) {
        await this.asistenciaRepo.delete(id);
    }
};
exports.DeportivoService = DeportivoService;
exports.DeportivoService = DeportivoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sesion_entrenamiento_entity_1.SesionEntrenamiento)),
    __param(1, (0, typeorm_1.InjectRepository)(partido_entity_1.Partido)),
    __param(2, (0, typeorm_1.InjectRepository)(asistencia_entity_1.Asistencia)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DeportivoService);
//# sourceMappingURL=deportivo.service.js.map