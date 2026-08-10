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
  condiciones_preexistentes: string;

  @Column({ type: 'text', nullable: true })
  medicacion_actual: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contacto_emergencia_nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  contacto_emergencia_telefono: string;

  @Column({ type: 'date' })
  fecha_actualizacion: string;
}
