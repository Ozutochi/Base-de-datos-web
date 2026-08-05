"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const rol_entity_1 = require("./entities/rol.entity");
const usuario_entity_1 = require("./entities/usuario.entity");
const categoria_entity_1 = require("./entities/categoria.entity");
const tarifa_entity_1 = require("./entities/tarifa.entity");
const estudiante_entity_1 = require("./entities/estudiante.entity");
const ficha_medica_entity_1 = require("./entities/ficha-medica.entity");
const personal_categoria_entity_1 = require("./entities/personal-categoria.entity");
const sesion_entrenamiento_entity_1 = require("./entities/sesion-entrenamiento.entity");
const partido_entity_1 = require("./entities/partido.entity");
const asistencia_entity_1 = require("./entities/asistencia.entity");
const inventario_entity_1 = require("./entities/inventario.entity");
const asignacion_equipamiento_entity_1 = require("./entities/asignacion-equipamiento.entity");
const mensualidad_entity_1 = require("./entities/mensualidad.entity");
const pago_entity_1 = require("./entities/pago.entity");
const usuarios_module_1 = require("./modules/usuarios/usuarios.module");
const academico_module_1 = require("./modules/academico/academico.module");
const deportivo_module_1 = require("./modules/deportivo/deportivo.module");
const financiero_module_1 = require("./modules/financiero/financiero.module");
const inventario_module_1 = require("./modules/inventario/inventario.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'escuela_futbol_db',
                entities: [
                    rol_entity_1.Rol,
                    usuario_entity_1.Usuario,
                    categoria_entity_1.Categoria,
                    tarifa_entity_1.Tarifa,
                    estudiante_entity_1.Estudiante,
                    ficha_medica_entity_1.FichaMedica,
                    personal_categoria_entity_1.PersonalCategoria,
                    sesion_entrenamiento_entity_1.SesionEntrenamiento,
                    partido_entity_1.Partido,
                    asistencia_entity_1.Asistencia,
                    inventario_entity_1.Inventario,
                    asignacion_equipamiento_entity_1.AsignacionEquipamiento,
                    mensualidad_entity_1.Mensualidad,
                    pago_entity_1.Pago,
                ],
                synchronize: true,
            }),
            usuarios_module_1.UsuariosModule,
            academico_module_1.AcademicoModule,
            deportivo_module_1.DeportivoModule,
            financiero_module_1.FinancieroModule,
            inventario_module_1.InventarioModule,
            dashboard_module_1.DashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map