import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSolicitudInscripcionDto {
  @IsNotEmpty()
  @IsNumber()
  representante_id: number;

  @IsNotEmpty()
  @IsNumber()
  categoria_id: number;

  @IsNotEmpty()
  @IsString()
  nombre_estudiante: string;

  @IsNotEmpty()
  @IsString()
  apellido_estudiante: string;

  @IsNotEmpty()
  @IsString()
  fecha_nacimiento: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class RechazarSolicitudDto {
  @IsOptional()
  @IsString()
  motivo_rechazo?: string;
}
