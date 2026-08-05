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
exports.CreateAsignacionDto = exports.CreateInventarioDto = void 0;
const class_validator_1 = require("class-validator");
const inventario_entity_1 = require("../../../entities/inventario.entity");
const asignacion_equipamiento_entity_1 = require("../../../entities/asignacion-equipamiento.entity");
class CreateInventarioDto {
    tipo_articulo;
    nombre_articulo;
    cantidad_disponible;
    estado_fisico;
    fecha_registro;
    categoria_id;
    responsable_id;
}
exports.CreateInventarioDto = CreateInventarioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "tipo_articulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "nombre_articulo", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateInventarioDto.prototype, "cantidad_disponible", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(inventario_entity_1.EstadoFisico),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "estado_fisico", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateInventarioDto.prototype, "fecha_registro", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInventarioDto.prototype, "categoria_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInventarioDto.prototype, "responsable_id", void 0);
class CreateAsignacionDto {
    estudiante_id;
    inventario_id;
    fecha_asignacion;
    fecha_devolucion;
    estado;
}
exports.CreateAsignacionDto = CreateAsignacionDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAsignacionDto.prototype, "estudiante_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAsignacionDto.prototype, "inventario_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAsignacionDto.prototype, "fecha_asignacion", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAsignacionDto.prototype, "fecha_devolucion", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(asignacion_equipamiento_entity_1.EstadoAsignacion),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAsignacionDto.prototype, "estado", void 0);
//# sourceMappingURL=inventario.dtos.js.map