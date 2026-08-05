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
exports.InventarioController = void 0;
const common_1 = require("@nestjs/common");
const inventario_service_1 = require("./inventario.service");
const inventario_dtos_1 = require("./dto/inventario.dtos");
let InventarioController = class InventarioController {
    inventarioService;
    constructor(inventarioService) {
        this.inventarioService = inventarioService;
    }
    createInventario(dto) {
        return this.inventarioService.createInventario(dto);
    }
    findAllInventarios() {
        return this.inventarioService.findAllInventarios();
    }
    updateInventario(id, dto) {
        return this.inventarioService.updateInventario(id, dto);
    }
    removeInventario(id) {
        return this.inventarioService.removeInventario(id);
    }
    createAsignacion(dto) {
        return this.inventarioService.createAsignacion(dto);
    }
    findAllAsignaciones() {
        return this.inventarioService.findAllAsignaciones();
    }
    updateAsignacion(id, dto) {
        return this.inventarioService.updateAsignacion(id, dto);
    }
    removeAsignacion(id) {
        return this.inventarioService.removeAsignacion(id);
    }
};
exports.InventarioController = InventarioController;
__decorate([
    (0, common_1.Post)('articulos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventario_dtos_1.CreateInventarioDto]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "createInventario", null);
__decorate([
    (0, common_1.Get)('articulos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "findAllInventarios", null);
__decorate([
    (0, common_1.Patch)('articulos/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "updateInventario", null);
__decorate([
    (0, common_1.Delete)('articulos/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "removeInventario", null);
__decorate([
    (0, common_1.Post)('asignaciones'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventario_dtos_1.CreateAsignacionDto]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "createAsignacion", null);
__decorate([
    (0, common_1.Get)('asignaciones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "findAllAsignaciones", null);
__decorate([
    (0, common_1.Patch)('asignaciones/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "updateAsignacion", null);
__decorate([
    (0, common_1.Delete)('asignaciones/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventarioController.prototype, "removeAsignacion", null);
exports.InventarioController = InventarioController = __decorate([
    (0, common_1.Controller)('inventario'),
    __metadata("design:paramtypes", [inventario_service_1.InventarioService])
], InventarioController);
//# sourceMappingURL=inventario.controller.js.map