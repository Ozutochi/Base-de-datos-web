import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Asistencia } from './asistencia.entity';

export enum EstadoPartido {
  PROGRAMADO = 'Programado',
  JUGADO = 'Jugado',
  SUSPENDIDO = 'Suspendido',
}

@Entity('partido')
export class Partido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.partidos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'varchar', length: 100 })
  equipo_rival: string;

  @Column({ type: 'varchar', length: 100 })
  lugar_cancha: string;

  @Column({ type: 'enum', enum: EstadoPartido, default: EstadoPartido.PROGRAMADO })
  estado_partido: EstadoPartido;

  @Column({ type: 'int', nullable: true })
  goles_nuestros: number;

  @Column({ type: 'int', nullable: true })
  goles_rival: number;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.partido)
  asistencias: Asistencia[];
}
