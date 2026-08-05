import { Rol } from './rol.entity';
import { Estudiante } from './estudiante.entity';
import { PersonalCategoria } from './personal-categoria.entity';
import { Inventario } from './inventario.entity';
import { Pago } from './pago.entity';
export declare enum EstadoUsuario {
    ACTIVO = "Activo",
    INACTIVO = "Inactivo"
}
export declare class Usuario {
    id: number;
    rol_id: number;
    rol: Rol;
    nombre: string;
    apellido: string;
    cedula: string;
    correo: string;
    telefono: string;
    password_hash: string;
    estado: EstadoUsuario;
    estudiantes_representados: Estudiante[];
    personal_categorias: PersonalCategoria[];
    inventarios_a_cargo: Inventario[];
    pagos_realizados: Pago[];
    pagos_verificados: Pago[];
}
