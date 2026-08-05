"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeportivoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const deportivo_controller_1 = require("./deportivo.controller");
const deportivo_service_1 = require("./deportivo.service");
const sesion_entrenamiento_entity_1 = require("../../entities/sesion-entrenamiento.entity");
const partido_entity_1 = require("../../entities/partido.entity");
const asistencia_entity_1 = require("../../entities/asistencia.entity");
let DeportivoModule = class DeportivoModule {
};
exports.DeportivoModule = DeportivoModule;
exports.DeportivoModule = DeportivoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sesion_entrenamiento_entity_1.SesionEntrenamiento, partido_entity_1.Partido, asistencia_entity_1.Asistencia])],
        controllers: [deportivo_controller_1.DeportivoController],
        providers: [deportivo_service_1.DeportivoService]
    })
], DeportivoModule);
//# sourceMappingURL=deportivo.module.js.map