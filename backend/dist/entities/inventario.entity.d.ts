import { Categoria } from './categoria.entity';
import { Usuario } from './usuario.entity';
import { AsignacionEquipamiento } from './asignacion-equipamiento.entity';
export declare enum EstadoFisico {
    BUENO = "Bueno",
    REGULAR = "Regular",
    MALO = "Malo"
}
export declare class Inventario {
    id: number;
    tipo_articulo: string;
    nombre_articulo: string;
    cantidad_disponible: number;
    estado_fisico: EstadoFisico;
    fecha_registro: string;
    categoria_id: number;
    categoria: Categoria;
    responsable_id: number;
    responsable: Usuario;
    asignaciones: AsignacionEquipamiento[];
}
