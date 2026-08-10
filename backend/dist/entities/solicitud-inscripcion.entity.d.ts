import { Usuario } from './usuario.entity';
import { Categoria } from './categoria.entity';
export declare enum EstadoSolicitud {
    PENDIENTE = "Pendiente",
    APROBADA = "Aprobada",
    RECHAZADA = "Rechazada"
}
export declare class SolicitudInscripcion {
    id: number;
    representante_id: number;
    representante: Usuario;
    categoria_id: number;
    categoria: Categoria;
    nombre_estudiante: string;
    apellido_estudiante: string;
    fecha_nacimiento: string;
    observaciones: string;
    estado: EstadoSolicitud;
    motivo_rechazo: string;
    fecha_solicitud: string;
    fecha_respuesta: string;
}
