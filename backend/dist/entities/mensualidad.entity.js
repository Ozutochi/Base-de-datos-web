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
exports.Mensualidad = exports.EstadoMensualidad = void 0;
const typeorm_1 = require("typeorm");
const estudiante_entity_1 = require("./estudiante.entity");
const tarifa_entity_1 = require("./tarifa.entity");
const pago_entity_1 = require("./pago.entity");
var EstadoMensualidad;
(function (EstadoMensualidad) {
    EstadoMensualidad["PAGADA"] = "Pagada";
    EstadoMensualidad["PENDIENTE"] = "Pendiente";
    EstadoMensualidad["VENCIDA"] = "Vencida";
})(EstadoMensualidad || (exports.EstadoMensualidad = EstadoMensualidad = {}));
let Mensualidad = class Mensualidad {
    id;
    estudiante_id;
    estudiante;
    tarifa_id;
    tarifa;
    mes;
    anio;
    monto_adeudado;
    moneda;
    estado;
    pagos;
};
exports.Mensualidad = Mensualidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Mensualidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Mensualidad.prototype, "estudiante_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estudiante_entity_1.Estudiante, (estudiante) => estudiante.mensualidades),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_id' }),
    __metadata("design:type", estudiante_entity_1.Estudiante)
], Mensualidad.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Mensualidad.prototype, "tarifa_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tarifa_entity_1.Tarifa, (tarifa) => tarifa.mensualidades),
    (0, typeorm_1.JoinColumn)({ name: 'tarifa_id' }),
    __metadata("design:type", tarifa_entity_1.Tarifa)
], Mensualidad.prototype, "tarifa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Mensualidad.prototype, "mes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Mensualidad.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Mensualidad.prototype, "monto_adeudado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3 }),
    __metadata("design:type", String)
], Mensualidad.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoMensualidad, default: EstadoMensualidad.PENDIENTE }),
    __metadata("design:type", String)
], Mensualidad.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.Pago, (pago) => pago.mensualidad),
    __metadata("design:type", Array)
], Mensualidad.prototype, "pagos", void 0);
exports.Mensualidad = Mensualidad = __decorate([
    (0, typeorm_1.Entity)('mensualidad')
], Mensualidad);
//# sourceMappingURL=mensualidad.entity.js.map