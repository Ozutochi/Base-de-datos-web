import { Repository } from 'typeorm';
import { Estudiante } from '../../entities/estudiante.entity';
import { FichaMedica } from '../../entities/ficha-medica.entity';
import { Categoria } from '../../entities/categoria.entity';
import { PersonalCategoria } from '../../entities/personal-categoria.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { CreateCategoriaDto, UpdateFichaMedicaDto, CreatePersonalCategoriaDto } from './dto/academico.dtos';
export declare class AcademicoService {
    private readonly estudianteRepo;
    private readonly fichaMedicaRepo;
    private readonly categoriaRepo;
    private readonly personalCategoriaRepo;
    constructor(estudianteRepo: Repository<Estudiante>, fichaMedicaRepo: Repository<FichaMedica>, categoriaRepo: Repository<Categoria>, personalCategoriaRepo: Repository<PersonalCategoria>);
    createEstudiante(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante>;
    findAllEstudiantes(): Promise<Estudiante[]>;
    findOneEstudiante(id: number): Promise<Estudiante>;
    updateEstudiante(id: number, updateDto: any): Promise<Estudiante>;
    removeEstudiante(id: number): Promise<void>;
    createCategoria(dto: CreateCategoriaDto): Promise<Categoria>;
    findAllCategorias(): Promise<Categoria[]>;
    findOneCategoria(id: number): Promise<Categoria>;
    updateCategoria(id: number, updateDto: any): Promise<Categoria>;
    removeCategoria(id: number): Promise<void>;
    findAllFichasMedicas(): Promise<FichaMedica[]>;
    updateFichaMedica(id: number, dto: UpdateFichaMedicaDto): Promise<FichaMedica>;
    findAllAsignaciones(): Promise<PersonalCategoria[]>;
    asignarPersonal(dto: CreatePersonalCategoriaDto): Promise<PersonalCategoria>;
    removeAsignacion(id: number): Promise<void>;
}
