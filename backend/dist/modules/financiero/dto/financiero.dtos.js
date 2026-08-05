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
exports.CreatePagoDto = exports.CreateMensualidadDto = exports.CreateTarifaDto = void 0;
const class_validator_1 = require("class-validator");
const mensualidad_entity_1 = require("../../../entities/mensualidad.entity");
const pago_entity_1 = require("../../../entities/pago.entity");
class CreateTarifaDto {
    categoria_id;
    monto;
    moneda;
    fecha_vigencia;
}
exports.CreateTarifaDto = CreateTarifaDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTarifaDto.prototype, "categoria_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTarifaDto.prototype, "monto", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTarifaDto.prototype, "moneda", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTarifaDto.prototype, "fecha_vigencia", void 0);
class CreateMensualidadDto {
    estudiante_id;
    tarifa_id;
    mes;
    anio;
    monto_adeudado;
    moneda;
    estado;
}
exports.CreateMensualidadDto = CreateMensualidadDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateMensualidadDto.prototype, "estudiante_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateMensualidadDto.prototype, "tarifa_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateMensualidadDto.prototype, "mes", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateMensualidadDto.prototype, "anio", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMensualidadDto.prototype, "monto_adeudado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMensualidadDto.prototype, "moneda", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(mensualidad_entity_1.EstadoMensualidad),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMensualidadDto.prototype, "estado", void 0);
class CreatePagoDto {
    representante_id;
    mensualidad_id;
    verificado_por_id;
    monto_pagado;
    moneda;
    tasa_cambio;
    metodo_pago;
    numero_referencia;
    numero_cuenta;
    fecha_pago;
    estado_pago;
}
exports.CreatePagoDto = CreatePagoDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "representante_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "mensualidad_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "verificado_por_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "monto_pagado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "moneda", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "tasa_cambio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "metodo_pago", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "numero_referencia", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "numero_cuenta", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "fecha_pago", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(pago_entity_1.EstadoPago),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "estado_pago", void 0);
//# sourceMappingURL=financiero.dtos.js.map