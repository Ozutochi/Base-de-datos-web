export declare class CreateSolicitudInscripcionDto {
    representante_id: number;
    categoria_id: number;
    nombre_estudiante: string;
    apellido_estudiante: string;
    fecha_nacimiento: string;
    observaciones?: string;
}
export declare class RechazarSolicitudDto {
    motivo_rechazo?: string;
}
