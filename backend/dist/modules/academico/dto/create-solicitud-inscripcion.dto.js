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
exports.RechazarSolicitudDto = exports.CreateSolicitudInscripcionDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSolicitudInscripcionDto {
    representante_id;
    categoria_id;
    nombre_estudiante;
    apellido_estudiante;
    fecha_nacimiento;
    observaciones;
}
exports.CreateSolicitudInscripcionDto = CreateSolicitudInscripcionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSolicitudInscripcionDto.prototype, "representante_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSolicitudInscripcionDto.prototype, "categoria_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSolicitudInscripcionDto.prototype, "nombre_estudiante", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSolicitudInscripcionDto.prototype, "apellido_estudiante", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSolicitudInscripcionDto.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSolicitudInscripcionDto.prototype, "observaciones", void 0);
class RechazarSolicitudDto {
    motivo_rechazo;
}
exports.RechazarSolicitudDto = RechazarSolicitudDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RechazarSolicitudDto.prototype, "motivo_rechazo", void 0);
//# sourceMappingURL=create-solicitud-inscripcion.dto.js.map