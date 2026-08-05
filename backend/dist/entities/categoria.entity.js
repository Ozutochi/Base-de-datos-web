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
exports.Categoria = exports.EstadoCategoria = void 0;
const typeorm_1 = require("typeorm");
const tarifa_entity_1 = require("./tarifa.entity");
const estudiante_entity_1 = require("./estudiante.entity");
const personal_categoria_entity_1 = require("./personal-categoria.entity");
const sesion_entrenamiento_entity_1 = require("./sesion-entrenamiento.entity");
const partido_entity_1 = require("./partido.entity");
const inventario_entity_1 = require("./inventario.entity");
var EstadoCategoria;
(function (EstadoCategoria) {
    EstadoCategoria["ACTIVO"] = "Activo";
    EstadoCategoria["INACTIVO"] = "Inactivo";
})(EstadoCategoria || (exports.EstadoCategoria = EstadoCategoria = {}));
let Categoria = class Categoria {
    id;
    nombre;
    tipo_modalidad;
    edad_minima;
    edad_maxima;
    estado;
    tarifas;
    estudiantes;
    personal;
    sesiones;
    partidos;
    inventarios;
};
exports.Categoria = Categoria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Categoria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Categoria.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Categoria.prototype, "tipo_modalidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Categoria.prototype, "edad_minima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Categoria.prototype, "edad_maxima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoCategoria, default: EstadoCategoria.ACTIVO }),
    __metadata("design:type", String)
], Categoria.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tarifa_entity_1.Tarifa, (tarifa) => tarifa.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "tarifas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estudiante_entity_1.Estudiante, (estudiante) => estudiante.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "estudiantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => personal_categoria_entity_1.PersonalCategoria, (pc) => pc.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "personal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sesion_entrenamiento_entity_1.SesionEntrenamiento, (sesion) => sesion.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "sesiones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => partido_entity_1.Partido, (partido) => partido.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "partidos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventario_entity_1.Inventario, (inventario) => inventario.categoria),
    __metadata("design:type", Array)
], Categoria.prototype, "inventarios", void 0);
exports.Categoria = Categoria = __decorate([
    (0, typeorm_1.Entity)('categoria')
], Categoria);
//# sourceMappingURL=categoria.entity.js.map