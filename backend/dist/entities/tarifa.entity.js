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
exports.Tarifa = void 0;
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("./categoria.entity");
const mensualidad_entity_1 = require("./mensualidad.entity");
let Tarifa = class Tarifa {
    id;
    categoria_id;
    categoria;
    monto;
    moneda;
    fecha_vigencia;
    mensualidades;
};
exports.Tarifa = Tarifa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tarifa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tarifa.prototype, "categoria_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, (categoria) => categoria.tarifas),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Tarifa.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Tarifa.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3 }),
    __metadata("design:type", String)
], Tarifa.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Tarifa.prototype, "fecha_vigencia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mensualidad_entity_1.Mensualidad, (mensualidad) => mensualidad.tarifa),
    __metadata("design:type", Array)
], Tarifa.prototype, "mensualidades", void 0);
exports.Tarifa = Tarifa = __decorate([
    (0, typeorm_1.Entity)('tarifa')
], Tarifa);
//# sourceMappingURL=tarifa.entity.js.map