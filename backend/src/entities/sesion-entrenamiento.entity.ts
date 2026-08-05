import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Asistencia } from './asistencia.entity';

@Entity('sesion_entrenamiento')
export class SesionEntrenamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.sesiones)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fin: string;

  @Column({ type: 'varchar', length: 100 })
  lugar_cancha: string;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.sesion)
  asistencias: Asistencia[];
}
