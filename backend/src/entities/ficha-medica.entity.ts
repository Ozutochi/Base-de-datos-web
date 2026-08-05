import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Entity('ficha_medica')
export class FichaMedica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  estudiante_id: number;

  @OneToOne(() => Estudiante, (estudiante) => estudiante.ficha_medica)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: Estudiante;

  @Column({ type: 'varchar', length: 5 })
  tipo_sangre: string;

  @Column({ type: 'text', nullable: true })
  alergias: string;

  @Column({ type: 'text', nullable: true })
  condiciones_medicas: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nombre_pediatra: string;

  @Column({ type: 'date' })
  fecha_actualizacion: string;
}
