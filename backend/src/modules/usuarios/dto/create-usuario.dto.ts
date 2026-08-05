import { IsString, IsEmail, IsInt, IsOptional, IsEnum } from 'class-validator';
import { EstadoUsuario } from '../../../entities/usuario.entity';

export class CreateUsuarioDto {
  @IsInt()
  rol_id: number;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  cedula: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  password_hash: string;

  @IsEnum(EstadoUsuario)
  @IsOptional()
  estado?: EstadoUsuario;
}
