import { AcademicoService } from './academico.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { CreateCategoriaDto, UpdateFichaMedicaDto, CreatePersonalCategoriaDto } from './dto/academico.dtos';
import { CreateSolicitudInscripcionDto, RechazarSolicitudDto } from './dto/create-solicitud-inscripcion.dto';
export declare class AcademicoController {
    private readonly academicoService;
    constructor(academicoService: AcademicoService);
    createEstudiante(createEstudianteDto: CreateEstudianteDto): Promise<import("../../entities/estudiante.entity").Estudiante>;
    findAllEstudiantes(): Promise<import("../../entities/estudiante.entity").Estudiante[]>;
    findOneEstudiante(id: number): Promise<import("../../entities/estudiante.entity").Estudiante>;
    updateEstudiante(id: number, updateDto: any): Promise<import("../../entities/estudiante.entity").Estudiante>;
    removeEstudiante(id: number): Promise<void>;
    createCategoria(dto: CreateCategoriaDto): Promise<import("../../entities/categoria.entity").Categoria>;
    findAllCategorias(): Promise<import("../../entities/categoria.entity").Categoria[]>;
    findOneCategoria(id: number): Promise<import("../../entities/categoria.entity").Categoria>;
    updateCategoria(id: number, updateDto: any): Promise<import("../../entities/categoria.entity").Categoria>;
    removeCategoria(id: number): Promise<void>;
    findAllFichasMedicas(): Promise<import("../../entities/ficha-medica.entity").FichaMedica[]>;
    updateFichaMedica(id: number, dto: UpdateFichaMedicaDto): Promise<import("../../entities/ficha-medica.entity").FichaMedica>;
    findAllAsignaciones(): Promise<import("../../entities/personal-categoria.entity").PersonalCategoria[]>;
    asignarPersonal(dto: CreatePersonalCategoriaDto): Promise<import("../../entities/personal-categoria.entity").PersonalCategoria>;
    removeAsignacion(id: number): Promise<void>;
    createSolicitud(dto: CreateSolicitudInscripcionDto): Promise<import("../../entities/solicitud-inscripcion.entity").SolicitudInscripcion>;
    findAllSolicitudes(representanteId?: string): Promise<import("../../entities/solicitud-inscripcion.entity").SolicitudInscripcion[]>;
    findOneSolicitud(id: number): Promise<import("../../entities/solicitud-inscripcion.entity").SolicitudInscripcion>;
    aprobarSolicitud(id: number): Promise<import("../../entities/solicitud-inscripcion.entity").SolicitudInscripcion>;
    rechazarSolicitud(id: number, dto: RechazarSolicitudDto): Promise<import("../../entities/solicitud-inscripcion.entity").SolicitudInscripcion>;
}
