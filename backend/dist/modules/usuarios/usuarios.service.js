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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../../entities/usuario.entity");
const rol_entity_1 = require("../../entities/rol.entity");
let UsuariosService = class UsuariosService {
    usuarioRepo;
    rolRepo;
    constructor(usuarioRepo, rolRepo) {
        this.usuarioRepo = usuarioRepo;
        this.rolRepo = rolRepo;
    }
    async create(createUsuarioDto) {
        const nuevoUsuario = this.usuarioRepo.create(createUsuarioDto);
        return await this.usuarioRepo.save(nuevoUsuario);
    }
    async findAll(rolId) {
        const whereCondition = rolId ? { rol_id: rolId } : {};
        return await this.usuarioRepo.find({ where: whereCondition, relations: { rol: true } });
    }
    async findOne(id) {
        const usuario = await this.usuarioRepo.findOne({ where: { id }, relations: { rol: true } });
        if (!usuario)
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        return usuario;
    }
    async update(id, updateDto) {
        const usuario = await this.findOne(id);
        this.usuarioRepo.merge(usuario, updateDto);
        return await this.usuarioRepo.save(usuario);
    }
    async remove(id) {
        const usuario = await this.findOne(id);
        await this.usuarioRepo.remove(usuario);
    }
    async findAllRoles() {
        return await this.rolRepo.find();
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(rol_entity_1.Rol)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map