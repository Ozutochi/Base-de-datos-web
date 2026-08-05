import { Categoria } from './categoria.entity';
import { Mensualidad } from './mensualidad.entity';
export declare class Tarifa {
    id: number;
    categoria_id: number;
    categoria: Categoria;
    monto: number;
    moneda: string;
    fecha_vigencia: string;
    mensualidades: Mensualidad[];
}
