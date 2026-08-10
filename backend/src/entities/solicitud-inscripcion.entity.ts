import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Categoria } from './categoria.entity';

export enum EstadoSolicitud {
  PENDIENTE = 'Pendiente',
  APROBADA = 'Aprobada',
  RECHAZADA = 'Rechazada',
}

@Entity('solicitud_inscripcion')
export class SolicitudInscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  representante_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'representante_id' })
  representante: Usuario;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'varchar', length: 50 })
  nombre_estudiante: string;

  @Column({ type: 'varchar', length: 50 })
  apellido_estudiante: string;

  @Column({ type: 'date' })
  fecha_nacimiento: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'enum', enum: EstadoSolicitud, default: EstadoSolicitud.PENDIENTE })
  estado: EstadoSolicitud;

  @Column({ type: 'text', nullable: true })
  motivo_rechazo: string;

  @Column({ type: 'date' })
  fecha_solicitud: string;

  @Column({ type: 'date', nullable: true })
  fecha_respuesta: string;
}
