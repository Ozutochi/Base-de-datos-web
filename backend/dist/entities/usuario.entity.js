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
exports.Usuario = exports.EstadoUsuario = void 0;
const typeorm_1 = require("typeorm");
const rol_entity_1 = require("./rol.entity");
const estudiante_entity_1 = require("./estudiante.entity");
const personal_categoria_entity_1 = require("./personal-categoria.entity");
const inventario_entity_1 = require("./inventario.entity");
const pago_entity_1 = require("./pago.entity");
var EstadoUsuario;
(function (EstadoUsuario) {
    EstadoUsuario["ACTIVO"] = "Activo";
    EstadoUsuario["INACTIVO"] = "Inactivo";
})(EstadoUsuario || (exports.EstadoUsuario = EstadoUsuario = {}));
let Usuario = class Usuario {
    id;
    rol_id;
    rol;
    nombre;
    apellido;
    cedula;
    correo;
    telefono;
    password_hash;
    estado;
    estudiantes_representados;
    personal_categorias;
    inventarios_a_cargo;
    pagos_realizados;
    pagos_verificados;
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Usuario.prototype, "rol_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol, (rol) => rol.usuarios),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", rol_entity_1.Rol)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Usuario.prototype, "cedula", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Usuario.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoUsuario, default: EstadoUsuario.ACTIVO }),
    __metadata("design:type", String)
], Usuario.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estudiante_entity_1.Estudiante, (estudiante) => estudiante.representante),
    __metadata("design:type", Array)
], Usuario.prototype, "estudiantes_representados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => personal_categoria_entity_1.PersonalCategoria, (pc) => pc.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "personal_categorias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventario_entity_1.Inventario, (inventario) => inventario.responsable),
    __metadata("design:type", Array)
], Usuario.prototype, "inventarios_a_cargo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.Pago, (pago) => pago.representante),
    __metadata("design:type", Array)
], Usuario.prototype, "pagos_realizados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.Pago, (pago) => pago.verificador),
    __metadata("design:type", Array)
], Usuario.prototype, "pagos_verificados", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuario')
], Usuario);
//# sourceMappingURL=usuario.entity.js.map