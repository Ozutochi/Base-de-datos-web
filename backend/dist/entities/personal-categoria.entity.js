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
exports.PersonalCategoria = exports.EstadoPersonalCategoria = void 0;
const typeorm_1 = require("typeorm");
const categoria_entity_1 = require("./categoria.entity");
const usuario_entity_1 = require("./usuario.entity");
var EstadoPersonalCategoria;
(function (EstadoPersonalCategoria) {
    EstadoPersonalCategoria["ACTIVO"] = "Activo";
    EstadoPersonalCategoria["INACTIVO"] = "Inactivo";
})(EstadoPersonalCategoria || (exports.EstadoPersonalCategoria = EstadoPersonalCategoria = {}));
let PersonalCategoria = class PersonalCategoria {
    id;
    categoria_id;
    categoria;
    usuario_id;
    usuario;
    cargo;
    fecha_asignacion;
    estado;
};
exports.PersonalCategoria = PersonalCategoria;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PersonalCategoria.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PersonalCategoria.prototype, "categoria_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_entity_1.Categoria, (categoria) => categoria.personal),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_entity_1.Categoria)
], PersonalCategoria.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PersonalCategoria.prototype, "usuario_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.personal_categorias),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], PersonalCategoria.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], PersonalCategoria.prototype, "cargo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], PersonalCategoria.prototype, "fecha_asignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EstadoPersonalCategoria, default: EstadoPersonalCategoria.ACTIVO }),
    __metadata("design:type", String)
], PersonalCategoria.prototype, "estado", void 0);
exports.PersonalCategoria = PersonalCategoria = __decorate([
    (0, typeorm_1.Entity)('personal_categoria')
], PersonalCategoria);
//# sourceMappingURL=personal-categoria.entity.js.map