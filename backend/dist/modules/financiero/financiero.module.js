"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancieroModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const financiero_controller_1 = require("./financiero.controller");
const financiero_service_1 = require("./financiero.service");
const tarifa_entity_1 = require("../../entities/tarifa.entity");
const mensualidad_entity_1 = require("../../entities/mensualidad.entity");
const pago_entity_1 = require("../../entities/pago.entity");
let FinancieroModule = class FinancieroModule {
};
exports.FinancieroModule = FinancieroModule;
exports.FinancieroModule = FinancieroModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tarifa_entity_1.Tarifa, mensualidad_entity_1.Mensualidad, pago_entity_1.Pago])],
        controllers: [financiero_controller_1.FinancieroController],
        providers: [financiero_service_1.FinancieroService]
    })
], FinancieroModule);
//# sourceMappingURL=financiero.module.js.map