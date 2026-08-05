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
exports.Pago = exports.EstadoPago = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const mensualidad_entity_1 = require("./mensualidad.entity");
var EstadoPago;
(function (EstadoPago) {
    EstadoPago["EN_REVISION"] = "En Revisi\u00F3n";
    EstadoPago["APROBADO"] = "Aprobado";
    EstadoPago["RECHAZADO"] = "Rechazado";
})(EstadoPago || (exports.EstadoPago = EstadoPago = {}));
let Pago = class Pago {
    id;
    representante_id;
    representante;
    mensualidad_id;
    mensualidad;
    verificado_por_id;
    verificador;
    monto_pagado;
    moneda;
    tasa_cambio;
    metodo_pago;
    numero_referencia;
    numero_cuenta;
    fecha_pago;
    estado_pago;
};
exports.Pago = Pago;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pago.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pago.prototype, "representante_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.pagos_realizados),
    (0, typeorm_1.JoinColumn)({ name: 'representante_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Pago.prototype, "representante", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pago.prototype, "mensualidad_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mensualidad_entity_1.Mensualidad, (mensualidad) => mensualidad.pagos),
    (0, typeorm_1.JoinColumn)({ name: 'mensualidad_id' }),
    __metadata("design:type", mensualidad_entity_1.Mensualidad)
], Pago.prototype, "mensualidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Pago.prototype, "verificado_por_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.pagos_verificados),
    (0, typeorm_1.JoinColumn)({ name: 'verificado_por_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Pago.prototype, "verificador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pago.prototype, "monto_pagado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3 }),
    __metadata("design:type", String)
], Pago.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 4 }),
    __metadata("design:type", Number)
], Pago.prototype, "tasa_cambio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Pago.prototype, "metodo_pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Pago.prototype, "numero_referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Pago.prototype, "numero_cuenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Pago.prototype, "fecha_pago", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoPago, default: EstadoPago.EN_REVISION }),
    __metadata("design:type", String)
], Pago.prototype, "estado_pago", void 0);
exports.Pago = Pago = __decorate([
    (0, typeorm_1.Entity)('pago')
], Pago);
//# sourceMappingURL=pago.entity.js.map