import { IsString, IsInt, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { EstadoEstudiante } from '../../../entities/estudiante.entity';

export class CreateEstudianteDto {
  @IsInt()
  representante_id: number;

  @IsInt()
  categoria_id: number;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsDateString()
  fecha_nacimiento: string;

  @IsDateString()
  fecha_ingreso: string;

  @IsEnum(EstadoEstudiante)
  @IsOptional()
  estado?: EstadoEstudiante;
}
