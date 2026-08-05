import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Categoria } from './categoria.entity';
import { FichaMedica } from './ficha-medica.entity';
import { Asistencia } from './asistencia.entity';
import { AsignacionEquipamiento } from './asignacion-equipamiento.entity';
import { Mensualidad } from './mensualidad.entity';

export enum EstadoEstudiante {
  ACTIVO = 'Activo',
  RETIRADO = 'Retirado',
  SUSPENDIDO = 'Suspendido',
}

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  representante_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.estudiantes_representados)
  @JoinColumn({ name: 'representante_id' })
  representante: Usuario;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.estudiantes)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'date' })
  fecha_nacimiento: string;

  @Column({ type: 'date' })
  fecha_ingreso: string;

  @Column({ type: 'enum', enum: EstadoEstudiante, default: EstadoEstudiante.ACTIVO })
  estado: EstadoEstudiante;

  @OneToOne(() => FichaMedica, (ficha) => ficha.estudiante)
  ficha_medica: FichaMedica;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.estudiante)
  asistencias: Asistencia[];

  @OneToMany(() => AsignacionEquipamiento, (asignacion) => asignacion.estudiante)
  asignaciones_equipamiento: AsignacionEquipamiento[];

  @OneToMany(() => Mensualidad, (mensualidad) => mensualidad.estudiante)
  mensualidades: Mensualidad[];
}
