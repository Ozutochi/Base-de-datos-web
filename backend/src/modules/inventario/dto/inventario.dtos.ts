import { IsString, IsInt, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { EstadoFisico } from '../../../entities/inventario.entity';
import { EstadoAsignacion } from '../../../entities/asignacion-equipamiento.entity';

export class CreateInventarioDto {
  @IsString()
  tipo_articulo: string;

  @IsString()
  nombre_articulo: string;

  @IsInt()
  cantidad_disponible: number;

  @IsEnum(EstadoFisico)
  @IsOptional()
  estado_fisico?: EstadoFisico;

  @IsDateString()
  fecha_registro: string;

  @IsInt()
  @IsOptional()
  categoria_id?: number;

  @IsInt()
  @IsOptional()
  responsable_id?: number;
}

export class CreateAsignacionDto {
  @IsInt()
  estudiante_id: number;

  @IsInt()
  inventario_id: number;

  @IsDateString()
  fecha_asignacion: string;

  @IsDateString()
  @IsOptional()
  fecha_devolucion?: string;

  @IsEnum(EstadoAsignacion)
  @IsOptional()
  estado?: EstadoAsignacion;
}
