"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
const estudiante_entity_1 = require("../../entities/estudiante.entity");
const pago_entity_1 = require("../../entities/pago.entity");
const inventario_entity_1 = require("../../entities/inventario.entity");
const asignacion_equipamiento_entity_1 = require("../../entities/asignacion-equipamiento.entity");
const partido_entity_1 = require("../../entities/partido.entity");
const mensualidad_entity_1 = require("../../entities/mensualidad.entity");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                estudiante_entity_1.Estudiante,
                pago_entity_1.Pago,
                inventario_entity_1.Inventario,
                asignacion_equipamiento_entity_1.AsignacionEquipamiento,
                partido_entity_1.Partido,
                mensualidad_entity_1.Mensualidad,
            ]),
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map