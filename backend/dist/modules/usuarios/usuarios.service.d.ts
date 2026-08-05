import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Rol } from '../../entities/rol.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
export declare class UsuariosService {
    private readonly usuarioRepo;
    private readonly rolRepo;
    constructor(usuarioRepo: Repository<Usuario>, rolRepo: Repository<Rol>);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    findAll(rolId?: number): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    update(id: number, updateDto: any): Promise<Usuario>;
    remove(id: number): Promise<void>;
    findAllRoles(): Promise<Rol[]>;
}
