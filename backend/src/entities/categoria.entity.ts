import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Tarifa } from './tarifa.entity';
import { Estudiante } from './estudiante.entity';
import { PersonalCategoria } from './personal-categoria.entity';
import { SesionEntrenamiento } from './sesion-entrenamiento.entity';
import { Partido } from './partido.entity';
import { Inventario } from './inventario.entity';

export enum EstadoCategoria {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  tipo_modalidad: string;

  @Column({ type: 'int' })
  edad_minima: number;

  @Column({ type: 'int' })
  edad_maxima: number;

  @Column({ type: 'enum', enum: EstadoCategoria, default: EstadoCategoria.ACTIVO })
  estado: EstadoCategoria;

  @OneToMany(() => Tarifa, (tarifa) => tarifa.categoria)
  tarifas: Tarifa[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.categoria)
  estudiantes: Estudiante[];

  @OneToMany(() => PersonalCategoria, (pc) => pc.categoria)
  personal: PersonalCategoria[];

  @OneToMany(() => SesionEntrenamiento, (sesion) => sesion.categoria)
  sesiones: SesionEntrenamiento[];

  @OneToMany(() => Partido, (partido) => partido.categoria)
  partidos: Partido[];

  @OneToMany(() => Inventario, (inventario) => inventario.categoria)
  inventarios: Inventario[];
}
