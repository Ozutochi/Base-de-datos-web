import { IsString, IsInt, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { EstadoPartido } from '../../../entities/partido.entity';
import { EstadoAsistencia } from '../../../entities/asistencia.entity';

export class CreateSesionDto {
  @IsInt()
  categoria_id: number;

  @IsDateString()
  fecha: string;

  @IsString()
  hora_inicio: string;

  @IsString()
  hora_fin: string;

  @IsString()
  lugar_cancha: string;
}

export class CreatePartidoDto {
  @IsInt()
  categoria_id: number;

  @IsDateString()
  fecha: string;

  @IsString()
  hora: string;

  @IsString()
  equipo_rival: string;

  @IsString()
  lugar_cancha: string;

  @IsEnum(EstadoPartido)
  @IsOptional()
  estado_partido?: EstadoPartido;

  @IsInt()
  @IsOptional()
  goles_nuestros?: number;

  @IsInt()
  @IsOptional()
  goles_rival?: number;
}

export class CreateAsistenciaDto {
  @IsInt()
  @IsOptional()
  sesion_id?: number;

  @IsInt()
  @IsOptional()
  partido_id?: number;

  @IsInt()
  estudiante_id: number;

  @IsEnum(EstadoAsistencia)
  estado_asistencia: EstadoAsistencia;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
