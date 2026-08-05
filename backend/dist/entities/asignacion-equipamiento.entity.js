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
exports.AsignacionEquipamiento = exports.EstadoAsignacion = void 0;
const typeorm_1 = require("typeorm");
const estudiante_entity_1 = require("./estudiante.entity");
const inventario_entity_1 = require("./inventario.entity");
var EstadoAsignacion;
(function (EstadoAsignacion) {
    EstadoAsignacion["ASIGNADO"] = "Asignado";
    EstadoAsignacion["DEVUELTO"] = "Devuelto";
})(EstadoAsignacion || (exports.EstadoAsignacion = EstadoAsignacion = {}));
let AsignacionEquipamiento = class AsignacionEquipamiento {
    id;
    estudiante_id;
    estudiante;
    inventario_id;
    inventario;
    fecha_asignacion;
    fecha_devolucion;
    estado;
};
exports.AsignacionEquipamiento = AsignacionEquipamiento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AsignacionEquipamiento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AsignacionEquipamiento.prototype, "estudiante_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estudiante_entity_1.Estudiante, (estudiante) => estudiante.asignaciones_equipamiento),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_id' }),
    __metadata("design:type", estudiante_entity_1.Estudiante)
], AsignacionEquipamiento.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AsignacionEquipamiento.prototype, "inventario_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventario_entity_1.Inventario, (inventario) => inventario.asignaciones),
    (0, typeorm_1.JoinColumn)({ name: 'inventario_id' }),
    __metadata("design:type", inventario_entity_1.Inventario)
], AsignacionEquipamiento.prototype, "inventario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], AsignacionEquipamiento.prototype, "fecha_asignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], AsignacionEquipamiento.prototype, "fecha_devolucion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoAsignacion, default: EstadoAsignacion.ASIGNADO }),
    __metadata("design:type", String)
], AsignacionEquipamiento.prototype, "estado", void 0);
exports.AsignacionEquipamiento = AsignacionEquipamiento = __decorate([
    (0, typeorm_1.Entity)('asignacion_equipamiento')
], AsignacionEquipamiento);
//# sourceMappingURL=asignacion-equipamiento.entity.js.map