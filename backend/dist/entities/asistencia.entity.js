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
exports.Asistencia = exports.EstadoAsistencia = void 0;
const typeorm_1 = require("typeorm");
const sesion_entrenamiento_entity_1 = require("./sesion-entrenamiento.entity");
const partido_entity_1 = require("./partido.entity");
const estudiante_entity_1 = require("./estudiante.entity");
var EstadoAsistencia;
(function (EstadoAsistencia) {
    EstadoAsistencia["PRESENTE"] = "Presente";
    EstadoAsistencia["AUSENTE"] = "Ausente";
    EstadoAsistencia["JUSTIFICADO"] = "Justificado";
})(EstadoAsistencia || (exports.EstadoAsistencia = EstadoAsistencia = {}));
let Asistencia = class Asistencia {
    id;
    sesion_id;
    sesion;
    partido_id;
    partido;
    estudiante_id;
    estudiante;
    estado_asistencia;
    observaciones;
};
exports.Asistencia = Asistencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Asistencia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Asistencia.prototype, "sesion_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sesion_entrenamiento_entity_1.SesionEntrenamiento, (sesion) => sesion.asistencias),
    (0, typeorm_1.JoinColumn)({ name: 'sesion_id' }),
    __metadata("design:type", sesion_entrenamiento_entity_1.SesionEntrenamiento)
], Asistencia.prototype, "sesion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Asistencia.prototype, "partido_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => partido_entity_1.Partido, (partido) => partido.asistencias),
    (0, typeorm_1.JoinColumn)({ name: 'partido_id' }),
    __metadata("design:type", partido_entity_1.Partido)
], Asistencia.prototype, "partido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Asistencia.prototype, "estudiante_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estudiante_entity_1.Estudiante, (estudiante) => estudiante.asistencias),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_id' }),
    __metadata("design:type", estudiante_entity_1.Estudiante)
], Asistencia.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoAsistencia }),
    __metadata("design:type", String)
], Asistencia.prototype, "estado_asistencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Asistencia.prototype, "observaciones", void 0);
exports.Asistencia = Asistencia = __decorate([
    (0, typeorm_1.Entity)('asistencia')
], Asistencia);
//# sourceMappingURL=asistencia.entity.js.map