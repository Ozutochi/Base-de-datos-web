import { EstadoFisico } from '../../../entities/inventario.entity';
import { EstadoAsignacion } from '../../../entities/asignacion-equipamiento.entity';
export declare class CreateInventarioDto {
    tipo_articulo: string;
    nombre_articulo: string;
    cantidad_disponible: number;
    estado_fisico?: EstadoFisico;
    fecha_registro: string;
    categoria_id?: number;
    responsable_id?: number;
}
export declare class CreateAsignacionDto {
    estudiante_id: number;
    inventario_id: number;
    fecha_asignacion: string;
    fecha_devolucion?: string;
    estado?: EstadoAsignacion;
}
