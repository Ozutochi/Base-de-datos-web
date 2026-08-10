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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonalCategoriaDto = exports.UpdateFichaMedicaDto = exports.CreateCategoriaDto = void 0;
const class_validator_1 = require("class-validator");
const categoria_entity_1 = require("../../../entities/categoria.entity");
const personal_categoria_entity_1 = require("../../../entities/personal-categoria.entity");
class CreateCategoriaDto {
    nombre;
    tipo_modalidad;
    edad_minima;
    edad_maxima;
    estado;
}
exports.CreateCategoriaDto = CreateCategoriaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCategoriaDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCategoriaDto.prototype, "tipo_modalidad", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCategoriaDto.prototype, "edad_minima", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCategoriaDto.prototype, "edad_maxima", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(categoria_entity_1.EstadoCategoria),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCategoriaDto.prototype, "estado", void 0);
class UpdateFichaMedicaDto {
    tipo_sangre;
    alergias;
    condiciones_preexistentes;
    medicacion_actual;
    contacto_emergencia_nombre;
    contacto_emergencia_telefono;
}
exports.UpdateFichaMedicaDto = UpdateFichaMedicaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFichaMedicaDto.prototype, "tipo_sangre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFichaMedicaDto.prototype, "alergias", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFichaMedicaDto.prototype, "condiciones_preexistentes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFichaMedicaDto.prototype, "medicacion_actual", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFichaMedicaDto.prototype, "contacto_emergencia_nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFichaMedicaDto.prototype, "contacto_emergencia_telefono", void 0);
class CreatePersonalCategoriaDto {
    categoria_id;
    usuario_id;
    cargo;
    fecha_asignacion;
    estado;
}
exports.CreatePersonalCategoriaDto = CreatePersonalCategoriaDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePersonalCategoriaDto.prototype, "categoria_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePersonalCategoriaDto.prototype, "usuario_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonalCategoriaDto.prototype, "cargo", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePersonalCategoriaDto.prototype, "fecha_asignacion", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(personal_categoria_entity_1.EstadoPersonalCategoria),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePersonalCategoriaDto.prototype, "estado", void 0);
//# sourceMappingURL=academico.dtos.js.map