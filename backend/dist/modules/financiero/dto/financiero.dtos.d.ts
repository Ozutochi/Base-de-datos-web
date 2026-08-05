import { EstadoMensualidad } from '../../../entities/mensualidad.entity';
import { EstadoPago } from '../../../entities/pago.entity';
export declare class CreateTarifaDto {
    categoria_id: number;
    monto: number;
    moneda: string;
    fecha_vigencia: string;
}
export declare class CreateMensualidadDto {
    estudiante_id: number;
    tarifa_id: number;
    mes: number;
    anio: number;
    monto_adeudado: number;
    moneda: string;
    estado?: EstadoMensualidad;
}
export declare class CreatePagoDto {
    representante_id: number;
    mensualidad_id: number;
    verificado_por_id?: number;
    monto_pagado: number;
    moneda: string;
    tasa_cambio: number;
    metodo_pago: string;
    numero_referencia: string;
    numero_cuenta: string;
    fecha_pago: string;
    estado_pago?: EstadoPago;
}
