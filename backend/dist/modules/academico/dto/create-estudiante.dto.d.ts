import { EstadoEstudiante } from '../../../entities/estudiante.entity';
export declare class CreateEstudianteDto {
    representante_id: number;
    categoria_id: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    fecha_ingreso: string;
    estado?: EstadoEstudiante;
}
