import { IsString, IsInt, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { EstadoCategoria } from '../../../entities/categoria.entity';
import { EstadoPersonalCategoria } from '../../../entities/personal-categoria.entity';

export class CreateCategoriaDto {
  @IsString()
  nombre: string;

  @IsString()
  tipo_modalidad: string;

  @IsInt()
  edad_minima: number;

  @IsInt()
  edad_maxima: number;

  @IsEnum(EstadoCategoria)
  @IsOptional()
  estado?: EstadoCategoria;
}

export class UpdateFichaMedicaDto {
  @IsString()
  @IsOptional()
  tipo_sangre?: string;

  @IsString()
  @IsOptional()
  alergias?: string;

  @IsString()
  @IsOptional()
  condiciones_preexistentes?: string;

  @IsString()
  @IsOptional()
  medicacion_actual?: string;

  @IsString()
  @IsOptional()
  contacto_emergencia_nombre?: string;

  @IsString()
  @IsOptional()
  contacto_emergencia_telefono?: string;
}

export class CreatePersonalCategoriaDto {
  @IsInt()
  categoria_id: number;

  @IsInt()
  usuario_id: number;

  @IsString()
  cargo: string;

  @IsDateString()
  fecha_asignacion: string;

  @IsEnum(EstadoPersonalCategoria)
  @IsOptional()
  estado?: EstadoPersonalCategoria;
}
