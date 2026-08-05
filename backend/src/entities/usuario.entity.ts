import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Rol } from './rol.entity';
import { Estudiante } from './estudiante.entity';
import { PersonalCategoria } from './personal-categoria.entity';
import { Inventario } from './inventario.entity';
import { Pago } from './pago.entity';

export enum EstadoUsuario {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rol_id: number;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'varchar', length: 20 })
  cedula: string;

  @Column({ type: 'varchar', length: 100 })
  correo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ type: 'enum', enum: EstadoUsuario, default: EstadoUsuario.ACTIVO })
  estado: EstadoUsuario;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.representante)
  estudiantes_representados: Estudiante[];

  @OneToMany(() => PersonalCategoria, (pc) => pc.usuario)
  personal_categorias: PersonalCategoria[];

  @OneToMany(() => Inventario, (inventario) => inventario.responsable)
  inventarios_a_cargo: Inventario[];

  @OneToMany(() => Pago, (pago) => pago.representante)
  pagos_realizados: Pago[];

  @OneToMany(() => Pago, (pago) => pago.verificador)
  pagos_verificados: Pago[];
}
