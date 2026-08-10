"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const academico_controller_1 = require("./academico.controller");
const academico_service_1 = require("./academico.service");
const estudiante_entity_1 = require("../../entities/estudiante.entity");
const ficha_medica_entity_1 = require("../../entities/ficha-medica.entity");
const categoria_entity_1 = require("../../entities/categoria.entity");
const personal_categoria_entity_1 = require("../../entities/personal-categoria.entity");
const solicitud_inscripcion_entity_1 = require("../../entities/solicitud-inscripcion.entity");
let AcademicoModule = class AcademicoModule {
};
exports.AcademicoModule = AcademicoModule;
exports.AcademicoModule = AcademicoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([estudiante_entity_1.Estudiante, ficha_medica_entity_1.FichaMedica, categoria_entity_1.Categoria, personal_categoria_entity_1.PersonalCategoria, solicitud_inscripcion_entity_1.SolicitudInscripcion])],
        controllers: [academico_controller_1.AcademicoController],
        providers: [academico_service_1.AcademicoService]
    })
], AcademicoModule);
//# sourceMappingURL=academico.module.js.map