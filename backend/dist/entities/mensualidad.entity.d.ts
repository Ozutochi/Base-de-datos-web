import { Estudiante } from './estudiante.entity';
import { Tarifa } from './tarifa.entity';
import { Pago } from './pago.entity';
export declare enum EstadoMensualidad {
    PAGADA = "Pagada",
    PENDIENTE = "Pendiente",
    VENCIDA = "Vencida"
}
export declare class Mensualidad {
    id: number;
    estudiante_id: number;
    estudiante: Estudiante;
    tarifa_id: number;
    tarifa: Tarifa;
    mes: number;
    anio: number;
    monto_adeudado: number;
    moneda: string;
    estado: EstadoMensualidad;
    pagos: Pago[];
}
