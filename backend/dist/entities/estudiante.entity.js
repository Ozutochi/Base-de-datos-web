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
exports.Estudiante = exports.EstadoEstudiante = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const categoria_entity_1 = require("./categoria.entity");
const ficha_medica_entity_1 = require("./ficha-medica.entity");
const asistencia_entity_1 = require("./asistencia.entity");
const asignacion_equipamiento_entity_1 = require("./asignacion-equipamiento.entity");
const mensualidad_entity_1 = require("./mensualidad.entity");
var EstadoEstudiante;
(function (EstadoEstudiante) {
    EstadoEstudiante["ACTIVO"] = "Activo";
    EstadoEstudiante["RETIRADO"] = "Retirado";
    EstadoEstudiante["SUSPENDIDO"] = "Suspendido";
})(EstadoEstudiante || (exports.EstadoEstudiante = EstadoEstudiante = {}));
let Estudiante = class Estudiante {
    id;
    representante_id;
    representante;
    categoria_id;
    categoria;
    nombre;
    apellido;
    fecha_nacimiento;
    fecha_ingreso;
    estado;
    ficha_medica;
    asistencias;
    asignaciones_equipamiento;
    mensualidades;
};
exports.Estudiante = Estudiante;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Estudiante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Estudiante.prototype, "representante_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.estudiantes_representados),
    (0, typeorm_1.JoinColumn)({ name: 'representante_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Estudiante.prototype, "representante", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Estudiante.prototype, "categoria_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, (categoria) => categoria.estudiantes),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], Estudiante.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Estudiante.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Estudiante.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Estudiante.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Estudiante.prototype, "fecha_ingreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoEstudiante, default: EstadoEstudiante.ACTIVO }),
    __metadata("design:type", String)
], Estudiante.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ficha_medica_entity_1.FichaMedica, (ficha) => ficha.estudiante),
    __metadata("design:type", ficha_medica_entity_1.FichaMedica)
], Estudiante.prototype, "ficha_medica", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asistencia_entity_1.Asistencia, (asistencia) => asistencia.estudiante),
    __metadata("design:type", Array)
], Estudiante.prototype, "asistencias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asignacion_equipamiento_entity_1.AsignacionEquipamiento, (asignacion) => asignacion.estudiante),
    __metadata("design:type", Array)
], Estudiante.prototype, "asignaciones_equipamiento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mensualidad_entity_1.Mensualidad, (mensualidad) => mensualidad.estudiante),
    __metadata("design:type", Array)
], Estudiante.prototype, "mensualidades", void 0);
exports.Estudiante = Estudiante = __decorate([
    (0, typeorm_1.Entity)('estudiante')
], Estudiante);
//# sourceMappingURL=estudiante.entity.js.map