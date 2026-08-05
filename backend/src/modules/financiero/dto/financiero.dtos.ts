import { IsString, IsInt, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { EstadoMensualidad } from '../../../entities/mensualidad.entity';
import { EstadoPago } from '../../../entities/pago.entity';

export class CreateTarifaDto {
  @IsInt()
  categoria_id: number;

  @IsNumber()
  monto: number;

  @IsString()
  moneda: string;

  @IsDateString()
  fecha_vigencia: string;
}

export class CreateMensualidadDto {
  @IsInt()
  estudiante_id: number;

  @IsInt()
  tarifa_id: number;

  @IsInt()
  mes: number;

  @IsInt()
  anio: number;

  @IsNumber()
  monto_adeudado: number;

  @IsString()
  moneda: string;

  @IsEnum(EstadoMensualidad)
  @IsOptional()
  estado?: EstadoMensualidad;
}

export class CreatePagoDto {
  @IsInt()
  representante_id: number;

  @IsInt()
  mensualidad_id: number;

  @IsInt()
  @IsOptional()
  verificado_por_id?: number;

  @IsNumber()
  monto_pagado: number;

  @IsString()
  moneda: string;

  @IsNumber()
  tasa_cambio: number;

  @IsString()
  metodo_pago: string;

  @IsString()
  numero_referencia: string;

  @IsString()
  numero_cuenta: string;

  @IsDateString()
  fecha_pago: string;

  @IsEnum(EstadoPago)
  @IsOptional()
  estado_pago?: EstadoPago;
}
