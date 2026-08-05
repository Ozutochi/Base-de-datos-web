import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Mensualidad } from './mensualidad.entity';

@Entity('tarifa')
export class Tarifa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.tarifas)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'varchar', length: 3 })
  moneda: string;

  @Column({ type: 'date' })
  fecha_vigencia: string;

  @OneToMany(() => Mensualidad, (mensualidad) => mensualidad.tarifa)
  mensualidades: Mensualidad[];
}
