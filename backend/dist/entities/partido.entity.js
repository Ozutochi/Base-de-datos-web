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
exports.Partido = exports.EstadoPartido = void 0;
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("./categoria.entity");
const asistencia_entity_1 = require("./asistencia.entity");
var EstadoPartido;
(function (EstadoPartido) {
    EstadoPartido["PROGRAMADO"] = "Programado";
    EstadoPartido["JUGADO"] = "Jugado";
    EstadoPartido["SUSPENDIDO"] = "Suspendido";
})(EstadoPartido || (exports.EstadoPartido = EstadoPartido = {}));
let Partido = class Partido {
    id;
    categoria_id;
    categoria;
    fecha;
    hora;
    equipo_rival;
    lugar_cancha;
    estado_partido;
    goles_nuestros;
    goles_rival;
    asistencias;
};
exports.Partido = Partido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Partido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Partido.prototype, "categoria_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, (categoria) => categoria.partidos),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Partido.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Partido.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Partido.prototype, "hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Partido.prototype, "equipo_rival", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Partido.prototype, "lugar_cancha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoPartido, default: EstadoPartido.PROGRAMADO }),
    __metadata("design:type", String)
], Partido.prototype, "estado_partido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Partido.prototype, "goles_nuestros", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Partido.prototype, "goles_rival", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asistencia_entity_1.Asistencia, (asistencia) => asistencia.partido),
    __metadata("design:type", Array)
], Partido.prototype, "asistencias", void 0);
exports.Partido = Partido = __decorate([
    (0, typeorm_1.Entity)('partido')
], Partido);
//# sourceMappingURL=partido.entity.js.map