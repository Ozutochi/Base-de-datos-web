import { Estudiante } from './estudiante.entity';
import { Inventario } from './inventario.entity';
export declare enum EstadoAsignacion {
    ASIGNADO = "Asignado",
    DEVUELTO = "Devuelto"
}
export declare class AsignacionEquipamiento {
    id: number;
    estudiante_id: number;
    estudiante: Estudiante;
    inventario_id: number;
    inventario: Inventario;
    fecha_asignacion: string;
    fecha_devolucion: string;
    estado: EstadoAsignacion;
}
