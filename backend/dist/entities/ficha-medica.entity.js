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
exports.FichaMedica = void 0;
const typeorm_1 = require("typeorm");
const estudiante_entity_1 = require("./estudiante.entity");
let FichaMedica = class FichaMedica {
    id;
    estudiante_id;
    estudiante;
    tipo_sangre;
    alergias;
    condiciones_medicas;
    nombre_pediatra;
    fecha_actualizacion;
};
exports.FichaMedica = FichaMedica;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FichaMedica.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], FichaMedica.prototype, "estudiante_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => estudiante_entity_1.Estudiante, (estudiante) => estudiante.ficha_medica),
    (0, typeorm_1.JoinColumn)({ name: 'estudiante_id' }),
    __metadata("design:type", estudiante_entity_1.Estudiante)
], FichaMedica.prototype, "estudiante", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 5 }),
    __metadata("design:type", String)
], FichaMedica.prototype, "tipo_sangre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FichaMedica.prototype, "alergias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FichaMedica.prototype, "condiciones_medicas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], FichaMedica.prototype, "nombre_pediatra", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], FichaMedica.prototype, "fecha_actualizacion", void 0);
exports.FichaMedica = FichaMedica = __decorate([
    (0, typeorm_1.Entity)('ficha_medica')
], FichaMedica);
//# sourceMappingURL=ficha-medica.entity.js.map