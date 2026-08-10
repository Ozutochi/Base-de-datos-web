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
exports.SolicitudInscripcion = exports.EstadoSolicitud = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const categoria_entity_1 = require("./categoria.entity");
var EstadoSolicitud;
(function (EstadoSolicitud) {
    EstadoSolicitud["PENDIENTE"] = "Pendiente";
    EstadoSolicitud["APROBADA"] = "Aprobada";
    EstadoSolicitud["RECHAZADA"] = "Rechazada";
})(EstadoSolicitud || (exports.EstadoSolicitud = EstadoSolicitud = {}));
let SolicitudInscripcion = class SolicitudInscripcion {
    id;
    representante_id;
    representante;
    categoria_id;
    categoria;
    nombre_estudiante;
    apellido_estudiante;
    fecha_nacimiento;
    observaciones;
    estado;
    motivo_rechazo;
    fecha_solicitud;
    fecha_respuesta;
};
exports.SolicitudInscripcion = SolicitudInscripcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SolicitudInscripcion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SolicitudInscripcion.prototype, "representante_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario),
    (0, typeorm_1.JoinColumn)({ name: 'representante_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], SolicitudInscripcion.prototype, "representante", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SolicitudInscripcion.prototype, "categoria_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], SolicitudInscripcion.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], SolicitudInscripcion.prototype, "nombre_estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], SolicitudInscripcion.prototype, "apellido_estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], SolicitudInscripcion.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SolicitudInscripcion.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoSolicitud, default: EstadoSolicitud.PENDIENTE }),
    __metadata("design:type", String)
], SolicitudInscripcion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SolicitudInscripcion.prototype, "motivo_rechazo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], SolicitudInscripcion.prototype, "fecha_solicitud", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], SolicitudInscripcion.prototype, "fecha_respuesta", void 0);
exports.SolicitudInscripcion = SolicitudInscripcion = __decorate([
    (0, typeorm_1.Entity)('solicitud_inscripcion')
], SolicitudInscripcion);
//# sourceMappingURL=solicitud-inscripcion.entity.js.map