import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from '../../entities/estudiante.entity';
import { FichaMedica } from '../../entities/ficha-medica.entity';
import { Categoria } from '../../entities/categoria.entity';
import { PersonalCategoria } from '../../entities/personal-categoria.entity';
import { SolicitudInscripcion, EstadoSolicitud } from '../../entities/solicitud-inscripcion.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { CreateCategoriaDto, UpdateFichaMedicaDto, CreatePersonalCategoriaDto } from './dto/academico.dtos';
import { CreateSolicitudInscripcionDto } from './dto/create-solicitud-inscripcion.dto';

@Injectable()
export class AcademicoService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    @InjectRepository(FichaMedica)
    private readonly fichaMedicaRepo: Repository<FichaMedica>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
    @InjectRepository(PersonalCategoria)
    private readonly personalCategoriaRepo: Repository<PersonalCategoria>,
    @InjectRepository(SolicitudInscripcion)
    private readonly solicitudRepo: Repository<SolicitudInscripcion>,
  ) {}

  // --- ESTUDIANTES ---
  async createEstudiante(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const nuevoEstudiante = this.estudianteRepo.create(createEstudianteDto);
    const estudianteGuardado = await this.estudianteRepo.save(nuevoEstudiante);

    const fichaMedica = this.fichaMedicaRepo.create({
      estudiante_id: estudianteGuardado.id,
      tipo_sangre: 'N/A', // Pendiente de actualizar
      fecha_actualizacion: new Date().toISOString().split('T')[0],
    });
    await this.fichaMedicaRepo.save(fichaMedica);

    return estudianteGuardado;
  }

  async findAllEstudiantes(): Promise<Estudiante[]> {
    return await this.estudianteRepo.find({ relations: { representante: true, categoria: true, ficha_medica: true } });
  }

  async findOneEstudiante(id: number): Promise<Estudiante> {
    const estudiante = await this.estudianteRepo.findOne({
      where: { id },
      relations: { categoria: true, representante: true, ficha_medica: true },
    });
    if (!estudiante) throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    return estudiante;
  }

  async updateEstudiante(id: number, updateDto: any): Promise<Estudiante> {
    // Verificar que el estudiante existe
    await this.findOneEstudiante(id);
    
    // Usar update directamente evita problemas con TypeORM intentando sincronizar
    // las relaciones cargadas (categoria, representante) con nulos.
    await this.estudianteRepo.update(id, updateDto);
    
    // Retornar el estudiante actualizado
    return await this.findOneEstudiante(id);
  }

  async removeEstudiante(id: number): Promise<void> {
    const estudiante = await this.findOneEstudiante(id);
    
    // Eliminar todas las relaciones en otras tablas usando query crudo
    // para saltarnos los conflictos de Foreign Keys sin inyectar repositorios externos
    await this.estudianteRepo.query(`DELETE FROM asistencia WHERE estudiante_id = ?`, [id]);
    await this.estudianteRepo.query(`DELETE FROM mensualidad WHERE estudiante_id = ?`, [id]);
    await this.estudianteRepo.query(`DELETE FROM asignacion_equipamiento WHERE estudiante_id = ?`, [id]);
    await this.estudianteRepo.query(`DELETE FROM ficha_medica WHERE estudiante_id = ?`, [id]);
    
    await this.estudianteRepo.remove(estudiante);
  }

  // --- CATEGORIAS ---
  async createCategoria(dto: CreateCategoriaDto): Promise<Categoria> {
    const nuevaCategoria = this.categoriaRepo.create(dto);
    return await this.categoriaRepo.save(nuevaCategoria);
  }

  async findAllCategorias(): Promise<Categoria[]> {
    return await this.categoriaRepo.find();
  }

  async findOneCategoria(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepo.findOne({ where: { id } });
    if (!categoria) throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    return categoria;
  }

  async updateCategoria(id: number, updateDto: any): Promise<Categoria> {
    const categoria = await this.findOneCategoria(id);
    this.categoriaRepo.merge(categoria, updateDto);
    return await this.categoriaRepo.save(categoria);
  }

  async removeCategoria(id: number): Promise<void> {
    const categoria = await this.findOneCategoria(id);
    await this.categoriaRepo.remove(categoria);
  }

  // --- FICHAS MEDICAS ---
  async findAllFichasMedicas(): Promise<FichaMedica[]> {
    return await this.fichaMedicaRepo.find({ relations: { estudiante: true } });
  }
  async updateFichaMedica(id: number, dto: UpdateFichaMedicaDto): Promise<FichaMedica> {
    const ficha = await this.fichaMedicaRepo.findOne({ where: { id } });
    if (!ficha) throw new NotFoundException(`Ficha Médica con ID ${id} no encontrada`);
    
    Object.assign(ficha, dto);
    ficha.fecha_actualizacion = new Date().toISOString().split('T')[0];
    return await this.fichaMedicaRepo.save(ficha);
  }

  // --- PERSONAL CATEGORIA ---
  async findAllAsignaciones(): Promise<PersonalCategoria[]> {
    return await this.personalCategoriaRepo.find({ relations: { usuario: true, categoria: true } });
  }

  async asignarPersonal(dto: CreatePersonalCategoriaDto): Promise<PersonalCategoria> {
    const asignacion = this.personalCategoriaRepo.create(dto);
    return await this.personalCategoriaRepo.save(asignacion);
  }

  async removeAsignacion(id: number): Promise<void> {
    const asignacion = await this.personalCategoriaRepo.findOne({ where: { id } });
    if (!asignacion) throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    await this.personalCategoriaRepo.remove(asignacion);
  }

  // --- SOLICITUDES DE INSCRIPCION ---
  async createSolicitud(dto: CreateSolicitudInscripcionDto): Promise<SolicitudInscripcion> {
    const hoy = new Date();
    const nac = new Date(dto.fecha_nacimiento);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const mes = hoy.getMonth() - nac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nac.getDate())) {
      edad--;
    }

    if (isNaN(nac.getTime()) || edad < 6) {
      throw new BadRequestException('El estudiante debe tener al menos 6 años cumplidos para registrar la solicitud de inscripción.');
    }

    const nuevaSolicitud = this.solicitudRepo.create({
      ...dto,
      estado: EstadoSolicitud.PENDIENTE,
      fecha_solicitud: hoy.toISOString().split('T')[0],
    });
    return await this.solicitudRepo.save(nuevaSolicitud);
  }

  async findAllSolicitudes(representanteId?: number): Promise<SolicitudInscripcion[]> {
    const where = representanteId ? { representante_id: representanteId } : {};
    return await this.solicitudRepo.find({
      where,
      relations: { representante: true, categoria: true },
      order: { id: 'DESC' },
    });
  }

  async findOneSolicitud(id: number): Promise<SolicitudInscripcion> {
    const solicitud = await this.solicitudRepo.findOne({
      where: { id },
      relations: { representante: true, categoria: true },
    });
    if (!solicitud) throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    return solicitud;
  }

  async aprobarSolicitud(id: number): Promise<SolicitudInscripcion> {
    const solicitud = await this.findOneSolicitud(id);
    if (solicitud.estado !== EstadoSolicitud.PENDIENTE) {
      throw new BadRequestException(`La solicitud ya se encuentra en estado: ${solicitud.estado}`);
    }

    solicitud.estado = EstadoSolicitud.APROBADA;
    solicitud.fecha_respuesta = new Date().toISOString().split('T')[0];
    const solicitudGuardada = await this.solicitudRepo.save(solicitud);

    // Crear el estudiante automáticamente
    await this.createEstudiante({
      representante_id: solicitud.representante_id,
      categoria_id: solicitud.categoria_id,
      nombre: solicitud.nombre_estudiante,
      apellido: solicitud.apellido_estudiante,
      fecha_nacimiento: solicitud.fecha_nacimiento,
      fecha_ingreso: new Date().toISOString().split('T')[0],
    });

    return solicitudGuardada;
  }

  async rechazarSolicitud(id: number, motivo?: string): Promise<SolicitudInscripcion> {
    const solicitud = await this.findOneSolicitud(id);
    if (solicitud.estado !== EstadoSolicitud.PENDIENTE) {
      throw new BadRequestException(`La solicitud ya se encuentra en estado: ${solicitud.estado}`);
    }

    solicitud.estado = EstadoSolicitud.RECHAZADA;
    solicitud.motivo_rechazo = motivo || 'Solicitud rechazada por la administración';
    solicitud.fecha_respuesta = new Date().toISOString().split('T')[0];

    return await this.solicitudRepo.save(solicitud);
  }
}
