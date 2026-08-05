import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SesionEntrenamiento } from './sesion-entrenamiento.entity';
import { Partido } from './partido.entity';
import { Estudiante } from './estudiante.entity';

export enum EstadoAsistencia {
  PRESENTE = 'Presente',
  AUSENTE = 'Ausente',
  JUSTIFICADO = 'Justificado',
}

@Entity('asistencia')
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sesion_id: number;

  @ManyToOne(() => SesionEntrenamiento, (sesion) => sesion.asistencias)
  @JoinColumn({ name: 'sesion_id' })
  sesion: SesionEntrenamiento;

  @Column({ nullable: true })
  partido_id: number;

  @ManyToOne(() => Partido, (partido) => partido.asistencias)
  @JoinColumn({ name: 'partido_id' })
  partido: Partido;

  @Column()
  estudiante_id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asistencias)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: Estudiante;

  @Column({ type: 'enum', enum: EstadoAsistencia })
  estado_asistencia: EstadoAsistencia;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observaciones: string;
}
