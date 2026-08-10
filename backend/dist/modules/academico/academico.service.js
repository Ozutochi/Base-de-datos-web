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
exports.AcademicoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const estudiante_entity_1 = require("../../entities/estudiante.entity");
const ficha_medica_entity_1 = require("../../entities/ficha-medica.entity");
const categoria_entity_1 = require("../../entities/categoria.entity");
const personal_categoria_entity_1 = require("../../entities/personal-categoria.entity");
let AcademicoService = class AcademicoService {
    estudianteRepo;
    fichaMedicaRepo;
    categoriaRepo;
    personalCategoriaRepo;
    constructor(estudianteRepo, fichaMedicaRepo, categoriaRepo, personalCategoriaRepo) {
        this.estudianteRepo = estudianteRepo;
        this.fichaMedicaRepo = fichaMedicaRepo;
        this.categoriaRepo = categoriaRepo;
        this.personalCategoriaRepo = personalCategoriaRepo;
    }
    async createEstudiante(createEstudianteDto) {
        const nuevoEstudiante = this.estudianteRepo.create(createEstudianteDto);
        const estudianteGuardado = await this.estudianteRepo.save(nuevoEstudiante);
        const fichaMedica = this.fichaMedicaRepo.create({
            estudiante_id: estudianteGuardado.id,
            tipo_sangre: 'N/A',
            fecha_actualizacion: new Date().toISOString().split('T')[0],
        });
        await this.fichaMedicaRepo.save(fichaMedica);
        return estudianteGuardado;
    }
    async findAllEstudiantes() {
        return await this.estudianteRepo.find({ relations: { representante: true, categoria: true, ficha_medica: true } });
    }
    async findOneEstudiante(id) {
        const estudiante = await this.estudianteRepo.findOne({
            where: { id },
            relations: { categoria: true, representante: true, ficha_medica: true },
        });
        if (!estudiante)
            throw new common_1.NotFoundException(`Estudiante con ID ${id} no encontrado`);
        return estudiante;
    }
    async updateEstudiante(id, updateDto) {
        await this.findOneEstudiante(id);
        await this.estudianteRepo.update(id, updateDto);
        return await this.findOneEstudiante(id);
    }
    async removeEstudiante(id) {
        const estudiante = await this.findOneEstudiante(id);
        await this.estudianteRepo.query(`DELETE FROM asistencia WHERE estudiante_id = ?`, [id]);
        await this.estudianteRepo.query(`DELETE FROM mensualidad WHERE estudiante_id = ?`, [id]);
        await this.estudianteRepo.query(`DELETE FROM asignacion_equipamiento WHERE estudiante_id = ?`, [id]);
        await this.estudianteRepo.query(`DELETE FROM ficha_medica WHERE estudiante_id = ?`, [id]);
        await this.estudianteRepo.remove(estudiante);
    }
    async createCategoria(dto) {
        const nuevaCategoria = this.categoriaRepo.create(dto);
        return await this.categoriaRepo.save(nuevaCategoria);
    }
    async findAllCategorias() {
        return await this.categoriaRepo.find();
    }
    async findOneCategoria(id) {
        const categoria = await this.categoriaRepo.findOne({ where: { id } });
        if (!categoria)
            throw new common_1.NotFoundException(`Categoría con ID ${id} no encontrada`);
        return categoria;
    }
    async updateCategoria(id, updateDto) {
        const categoria = await this.findOneCategoria(id);
        this.categoriaRepo.merge(categoria, updateDto);
        return await this.categoriaRepo.save(categoria);
    }
    async removeCategoria(id) {
        const categoria = await this.findOneCategoria(id);
        await this.categoriaRepo.remove(categoria);
    }
    async findAllFichasMedicas() {
        return await this.fichaMedicaRepo.find({ relations: { estudiante: true } });
    }
    async updateFichaMedica(id, dto) {
        const ficha = await this.fichaMedicaRepo.findOne({ where: { id } });
        if (!ficha)
            throw new common_1.NotFoundException(`Ficha Médica con ID ${id} no encontrada`);
        Object.assign(ficha, dto);
        ficha.fecha_actualizacion = new Date().toISOString().split('T')[0];
        return await this.fichaMedicaRepo.save(ficha);
    }
    async findAllAsignaciones() {
        return await this.personalCategoriaRepo.find({ relations: { usuario: true, categoria: true } });
    }
    async asignarPersonal(dto) {
        const asignacion = this.personalCategoriaRepo.create(dto);
        return await this.personalCategoriaRepo.save(asignacion);
    }
    async removeAsignacion(id) {
        const asignacion = await this.personalCategoriaRepo.findOne({ where: { id } });
        if (!asignacion)
            throw new common_1.NotFoundException(`Asignación con ID ${id} no encontrada`);
        await this.personalCategoriaRepo.remove(asignacion);
    }
};
exports.AcademicoService = AcademicoService;
exports.AcademicoService = AcademicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estudiante_entity_1.Estudiante)),
    __param(1, (0, typeorm_1.InjectRepository)(ficha_medica_entity_1.FichaMedica)),
    __param(2, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __param(3, (0, typeorm_1.InjectRepository)(personal_categoria_entity_1.PersonalCategoria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AcademicoService);
//# sourceMappingURL=academico.service.js.map