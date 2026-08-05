import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("../../entities/usuario.entity").Usuario>;
    findAll(rolId?: string): Promise<import("../../entities/usuario.entity").Usuario[]>;
    findOne(id: number): Promise<import("../../entities/usuario.entity").Usuario>;
    update(id: number, updateUsuarioDto: any): Promise<import("../../entities/usuario.entity").Usuario>;
    remove(id: number): Promise<void>;
    findAllRoles(): Promise<import("../../entities/rol.entity").Rol[]>;
}
