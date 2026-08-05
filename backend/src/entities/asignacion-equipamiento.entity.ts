import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Inventario } from './inventario.entity';

export enum EstadoAsignacion {
  ASIGNADO = 'Asignado',
  DEVUELTO = 'Devuelto',
}

@Entity('asignacion_equipamiento')
export class AsignacionEquipamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estudiante_id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.asignaciones_equipamiento)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: Estudiante;

  @Column()
  inventario_id: number;

  @ManyToOne(() => Inventario, (inventario) => inventario.asignaciones)
  @JoinColumn({ name: 'inventario_id' })
  inventario: Inventario;

  @Column({ type: 'date' })
  fecha_asignacion: string;

  @Column({ type: 'date', nullable: true })
  fecha_devolucion: string;

  @Column({ type: 'enum', enum: EstadoAsignacion, default: EstadoAsignacion.ASIGNADO })
  estado: EstadoAsignacion;
}
