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
exports.Inventario = exports.EstadoFisico = void 0;
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("./categoria.entity");
const usuario_entity_1 = require("./usuario.entity");
const asignacion_equipamiento_entity_1 = require("./asignacion-equipamiento.entity");
var EstadoFisico;
(function (EstadoFisico) {
    EstadoFisico["BUENO"] = "Bueno";
    EstadoFisico["REGULAR"] = "Regular";
    EstadoFisico["MALO"] = "Malo";
})(EstadoFisico || (exports.EstadoFisico = EstadoFisico = {}));
let Inventario = class Inventario {
    id;
    tipo_articulo;
    nombre_articulo;
    cantidad_disponible;
    estado_fisico;
    fecha_registro;
    categoria_id;
    categoria;
    responsable_id;
    responsable;
    asignaciones;
};
exports.Inventario = Inventario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inventario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Inventario.prototype, "tipo_articulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Inventario.prototype, "nombre_articulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Inventario.prototype, "cantidad_disponible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoFisico, default: EstadoFisico.BUENO }),
    __metadata("design:type", String)
], Inventario.prototype, "estado_fisico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Inventario.prototype, "fecha_registro", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "categoria_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, (categoria) => categoria.inventarios),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Inventario.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Inventario.prototype, "responsable_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.inventarios_a_cargo),
    (0, typeorm_1.JoinColumn)({ name: 'responsable_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Inventario.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asignacion_equipamiento_entity_1.AsignacionEquipamiento, (asignacion) => asignacion.inventario),
    __metadata("design:type", Array)
], Inventario.prototype, "asignaciones", void 0);
exports.Inventario = Inventario = __decorate([
    (0, typeorm_1.Entity)('inventario')
], Inventario);
//# sourceMappingURL=inventario.entity.js.map