import { Usuario } from './usuario.entity';
import { Categoria } from './categoria.entity';
import { FichaMedica } from './ficha-medica.entity';
import { Asistencia } from './asistencia.entity';
import { AsignacionEquipamiento } from './asignacion-equipamiento.entity';
import { Mensualidad } from './mensualidad.entity';
export declare enum EstadoEstudiante {
    ACTIVO = "Activo",
    RETIRADO = "Retirado",
    SUSPENDIDO = "Suspendido"
}
export declare class Estudiante {
    id: number;
    representante_id: number;
    representante: Usuario;
    categoria_id: number;
    categoria: Categoria;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    fecha_ingreso: string;
    estado: EstadoEstudiante;
    ficha_medica: FichaMedica;
    asistencias: Asistencia[];
    asignaciones_equipamiento: AsignacionEquipamiento[];
    mensualidades: Mensualidad[];
}
