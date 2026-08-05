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
exports.FinancieroController = void 0;
const common_1 = require("@nestjs/common");
const financiero_service_1 = require("./financiero.service");
const financiero_dtos_1 = require("./dto/financiero.dtos");
let FinancieroController = class FinancieroController {
    financieroService;
    constructor(financieroService) {
        this.financieroService = financieroService;
    }
    createTarifa(dto) {
        return this.financieroService.createTarifa(dto);
    }
    findAllTarifas() {
        return this.financieroService.findAllTarifas();
    }
    updateTarifa(id, dto) {
        return this.financieroService.updateTarifa(id, dto);
    }
    removeTarifa(id) {
        return this.financieroService.removeTarifa(id);
    }
    createMensualidad(dto) {
        return this.financieroService.createMensualidad(dto);
    }
    findAllMensualidades() {
        return this.financieroService.findAllMensualidades();
    }
    updateMensualidad(id, dto) {
        return this.financieroService.updateMensualidad(id, dto);
    }
    removeMensualidad(id) {
        return this.financieroService.removeMensualidad(id);
    }
    createPago(dto) {
        return this.financieroService.createPago(dto);
    }
    findAllPagos() {
        return this.financieroService.findAllPagos();
    }
    updatePago(id, dto) {
        return this.financieroService.updatePago(id, dto);
    }
    removePago(id) {
        return this.financieroService.removePago(id);
    }
};
exports.FinancieroController = FinancieroController;
__decorate([
    (0, common_1.Post)('tarifas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [financiero_dtos_1.CreateTarifaDto]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "createTarifa", null);
__decorate([
    (0, common_1.Get)('tarifas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "findAllTarifas", null);
__decorate([
    (0, common_1.Patch)('tarifas/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "updateTarifa", null);
__decorate([
    (0, common_1.Delete)('tarifas/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "removeTarifa", null);
__decorate([
    (0, common_1.Post)('mensualidades'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [financiero_dtos_1.CreateMensualidadDto]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "createMensualidad", null);
__decorate([
    (0, common_1.Get)('mensualidades'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "findAllMensualidades", null);
__decorate([
    (0, common_1.Patch)('mensualidades/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "updateMensualidad", null);
__decorate([
    (0, common_1.Delete)('mensualidades/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "removeMensualidad", null);
__decorate([
    (0, common_1.Post)('pagos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [financiero_dtos_1.CreatePagoDto]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "createPago", null);
__decorate([
    (0, common_1.Get)('pagos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "findAllPagos", null);
__decorate([
    (0, common_1.Patch)('pagos/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "updatePago", null);
__decorate([
    (0, common_1.Delete)('pagos/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FinancieroController.prototype, "removePago", null);
exports.FinancieroController = FinancieroController = __decorate([
    (0, common_1.Controller)('financiero'),
    __metadata("design:paramtypes", [financiero_service_1.FinancieroService])
], FinancieroController);
//# sourceMappingURL=financiero.controller.js.map