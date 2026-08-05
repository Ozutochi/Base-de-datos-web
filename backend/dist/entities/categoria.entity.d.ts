import { Tarifa } from './tarifa.entity';
import { Estudiante } from './estudiante.entity';
import { PersonalCategoria } from './personal-categoria.entity';
import { SesionEntrenamiento } from './sesion-entrenamiento.entity';
import { Partido } from './partido.entity';
import { Inventario } from './inventario.entity';
export declare enum EstadoCategoria {
    ACTIVO = "Activo",
    INACTIVO = "Inactivo"
}
export declare class Categoria {
    id: number;
    nombre: string;
    tipo_modalidad: string;
    edad_minima: number;
    edad_maxima: number;
    estado: EstadoCategoria;
    tarifas: Tarifa[];
    estudiantes: Estudiante[];
    personal: PersonalCategoria[];
    sesiones: SesionEntrenamiento[];
    partidos: Partido[];
    inventarios: Inventario[];
}
