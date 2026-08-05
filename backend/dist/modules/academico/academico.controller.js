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
exports.AcademicoController = void 0;
const common_1 = require("@nestjs/common");
const academico_service_1 = require("./academico.service");
const create_estudiante_dto_1 = require("./dto/create-estudiante.dto");
const academico_dtos_1 = require("./dto/academico.dtos");
let AcademicoController = class AcademicoController {
    academicoService;
    constructor(academicoService) {
        this.academicoService = academicoService;
    }
    createEstudiante(createEstudianteDto) {
        return this.academicoService.createEstudiante(createEstudianteDto);
    }
    findAllEstudiantes() {
        return this.academicoService.findAllEstudiantes();
    }
    findOneEstudiante(id) {
        return this.academicoService.findOneEstudiante(id);
    }
    updateEstudiante(id, updateDto) {
        return this.academicoService.updateEstudiante(id, updateDto);
    }
    removeEstudiante(id) {
        return this.academicoService.removeEstudiante(id);
    }
    createCategoria(dto) {
        return this.academicoService.createCategoria(dto);
    }
    findAllCategorias() {
        return this.academicoService.findAllCategorias();
    }
    findOneCategoria(id) {
        return this.academicoService.findOneCategoria(id);
    }
    updateCategoria(id, updateDto) {
        return this.academicoService.updateCategoria(id, updateDto);
    }
    removeCategoria(id) {
        return this.academicoService.removeCategoria(id);
    }
    findAllFichasMedicas() {
        return this.academicoService.findAllFichasMedicas();
    }
    updateFichaMedica(id, dto) {
        return this.academicoService.updateFichaMedica(id, dto);
    }
    findAllAsignaciones() {
        return this.academicoService.findAllAsignaciones();
    }
    asignarPersonal(dto) {
        return this.academicoService.asignarPersonal(dto);
    }
    removeAsignacion(id) {
        return this.academicoService.removeAsignacion(id);
    }
};
exports.AcademicoController = AcademicoController;
__decorate([
    (0, common_1.Post)('estudiantes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estudiante_dto_1.CreateEstudianteDto]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "createEstudiante", null);
__decorate([
    (0, common_1.Get)('estudiantes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "findAllEstudiantes", null);
__decorate([
    (0, common_1.Get)('estudiantes/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "findOneEstudiante", null);
__decorate([
    (0, common_1.Patch)('estudiantes/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "updateEstudiante", null);
__decorate([
    (0, common_1.Delete)('estudiantes/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "removeEstudiante", null);
__decorate([
    (0, common_1.Post)('categorias'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [academico_dtos_1.CreateCategoriaDto]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "createCategoria", null);
__decorate([
    (0, common_1.Get)('categorias'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "findAllCategorias", null);
__decorate([
    (0, common_1.Get)('categorias/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "findOneCategoria", null);
__decorate([
    (0, common_1.Patch)('categorias/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "updateCategoria", null);
__decorate([
    (0, common_1.Delete)('categorias/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "removeCategoria", null);
__decorate([
    (0, common_1.Get)('fichas-medicas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "findAllFichasMedicas", null);
__decorate([
    (0, common_1.Patch)('fichas-medicas/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, academico_dtos_1.UpdateFichaMedicaDto]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "updateFichaMedica", null);
__decorate([
    (0, common_1.Get)('personal'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "findAllAsignaciones", null);
__decorate([
    (0, common_1.Post)('personal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [academico_dtos_1.CreatePersonalCategoriaDto]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "asignarPersonal", null);
__decorate([
    (0, common_1.Delete)('personal/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AcademicoController.prototype, "removeAsignacion", null);
exports.AcademicoController = AcademicoController = __decorate([
    (0, common_1.Controller)('academico'),
    __metadata("design:paramtypes", [academico_service_1.AcademicoService])
], AcademicoController);
//# sourceMappingURL=academico.controller.js.map