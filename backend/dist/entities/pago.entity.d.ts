import { Usuario } from './usuario.entity';
import { Mensualidad } from './mensualidad.entity';
export declare enum EstadoPago {
    EN_REVISION = "En Revisi\u00F3n",
    APROBADO = "Aprobado",
    RECHAZADO = "Rechazado"
}
export declare class Pago {
    id: number;
    representante_id: number;
    representante: Usuario;
    mensualidad_id: number;
    mensualidad: Mensualidad;
    verificado_por_id: number;
    verificador: Usuario;
    monto_pagado: number;
    moneda: string;
    tasa_cambio: number;
    metodo_pago: string;
    numero_referencia: string;
    numero_cuenta: string;
    fecha_pago: string;
    estado_pago: EstadoPago;
}
