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
exports.CreateAsistenciaDto = exports.CreatePartidoDto = exports.CreateSesionDto = void 0;
const class_validator_1 = require("class-validator");
const partido_entity_1 = require("../../../entities/partido.entity");
const asistencia_entity_1 = require("../../../entities/asistencia.entity");
class CreateSesionDto {
    categoria_id;
    fecha;
    hora_inicio;
    hora_fin;
    lugar_cancha;
}
exports.CreateSesionDto = CreateSesionDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateSesionDto.prototype, "categoria_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSesionDto.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSesionDto.prototype, "hora_inicio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSesionDto.prototype, "hora_fin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSesionDto.prototype, "lugar_cancha", void 0);
class CreatePartidoDto {
    categoria_id;
    fecha;
    hora;
    equipo_rival;
    lugar_cancha;
    estado_partido;
    goles_nuestros;
    goles_rival;
}
exports.CreatePartidoDto = CreatePartidoDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "categoria_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePartidoDto.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartidoDto.prototype, "hora", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartidoDto.prototype, "equipo_rival", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartidoDto.prototype, "lugar_cancha", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(partido_entity_1.EstadoPartido),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePartidoDto.prototype, "estado_partido", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "goles_nuestros", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePartidoDto.prototype, "goles_rival", void 0);
class CreateAsistenciaDto {
    sesion_id;
    partido_id;
    estudiante_id;
    estado_asistencia;
    observaciones;
}
exports.CreateAsistenciaDto = CreateAsistenciaDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAsistenciaDto.prototype, "sesion_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAsistenciaDto.prototype, "partido_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAsistenciaDto.prototype, "estudiante_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(asistencia_entity_1.EstadoAsistencia),
    __metadata("design:type", String)
], CreateAsistenciaDto.prototype, "estado_asistencia", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAsistenciaDto.prototype, "observaciones", void 0);
//# sourceMappingURL=deportivo.dtos.js.map