import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Rol } from '../../entities/rol.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepo.create(createUsuarioDto);
    return await this.usuarioRepo.save(nuevoUsuario);
  }

  async findAll(rolId?: number): Promise<Usuario[]> {
    const whereCondition = rolId ? { rol_id: rolId } : {};
    return await this.usuarioRepo.find({ where: whereCondition, relations: { rol: true } });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id }, relations: { rol: true } });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async update(id: number, updateDto: any): Promise<Usuario> {
    const usuario = await this.findOne(id);
    this.usuarioRepo.merge(usuario, updateDto);
    return await this.usuarioRepo.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepo.remove(usuario);
  }

  // --- ROLES ---
  async findAllRoles(): Promise<Rol[]> {
    return await this.rolRepo.find();
  }
}
