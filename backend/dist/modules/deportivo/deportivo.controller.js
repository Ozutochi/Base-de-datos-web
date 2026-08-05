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
exports.DeportivoController = void 0;
const common_1 = require("@nestjs/common");
const deportivo_service_1 = require("./deportivo.service");
const deportivo_dtos_1 = require("./dto/deportivo.dtos");
let DeportivoController = class DeportivoController {
    deportivoService;
    constructor(deportivoService) {
        this.deportivoService = deportivoService;
    }
    createSesion(dto) {
        return this.deportivoService.createSesion(dto);
    }
    findAllSesiones() {
        return this.deportivoService.findAllSesiones();
    }
    updateSesion(id, dto) {
        return this.deportivoService.updateSesion(id, dto);
    }
    removeSesion(id) {
        return this.deportivoService.removeSesion(id);
    }
    createPartido(dto) {
        return this.deportivoService.createPartido(dto);
    }
    findAllPartidos() {
        return this.deportivoService.findAllPartidos();
    }
    updatePartido(id, dto) {
        return this.deportivoService.updatePartido(id, dto);
    }
    removePartido(id) {
        return this.deportivoService.removePartido(id);
    }
    registrarAsistencia(dto) {
        return this.deportivoService.registrarAsistencia(dto);
    }
    findAllAsistencias() {
        return this.deportivoService.findAllAsistencias();
    }
    updateAsistencia(id, dto) {
        return this.deportivoService.updateAsistencia(id, dto);
    }
    removeAsistencia(id) {
        return this.deportivoService.removeAsistencia(id);
    }
};
exports.DeportivoController = DeportivoController;
__decorate([
    (0, common_1.Post)('sesiones'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deportivo_dtos_1.CreateSesionDto]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "createSesion", null);
__decorate([
    (0, common_1.Get)('sesiones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "findAllSesiones", null);
__decorate([
    (0, common_1.Patch)('sesiones/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "updateSesion", null);
__decorate([
    (0, common_1.Delete)('sesiones/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "removeSesion", null);
__decorate([
    (0, common_1.Post)('partidos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deportivo_dtos_1.CreatePartidoDto]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "createPartido", null);
__decorate([
    (0, common_1.Get)('partidos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "findAllPartidos", null);
__decorate([
    (0, common_1.Patch)('partidos/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "updatePartido", null);
__decorate([
    (0, common_1.Delete)('partidos/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "removePartido", null);
__decorate([
    (0, common_1.Post)('asistencias'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deportivo_dtos_1.CreateAsistenciaDto]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "registrarAsistencia", null);
__decorate([
    (0, common_1.Get)('asistencias'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "findAllAsistencias", null);
__decorate([
    (0, common_1.Patch)('asistencias/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "updateAsistencia", null);
__decorate([
    (0, common_1.Delete)('asistencias/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DeportivoController.prototype, "removeAsistencia", null);
exports.DeportivoController = DeportivoController = __decorate([
    (0, common_1.Controller)('deportivo'),
    __metadata("design:paramtypes", [deportivo_service_1.DeportivoService])
], DeportivoController);
//# sourceMappingURL=deportivo.controller.js.map