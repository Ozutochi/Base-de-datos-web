import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Tarifa } from './tarifa.entity';
import { Pago } from './pago.entity';

export enum EstadoMensualidad {
  PAGADA = 'Pagada',
  PENDIENTE = 'Pendiente',
  VENCIDA = 'Vencida',
}

@Entity('mensualidad')
export class Mensualidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estudiante_id: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.mensualidades)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: Estudiante;

  @Column()
  tarifa_id: number;

  @ManyToOne(() => Tarifa, (tarifa) => tarifa.mensualidades)
  @JoinColumn({ name: 'tarifa_id' })
  tarifa: Tarifa;

  @Column({ type: 'int' })
  mes: number;

  @Column({ type: 'int' })
  anio: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto_adeudado: number;

  @Column({ type: 'varchar', length: 3 })
  moneda: string;

  @Column({ type: 'enum', enum: EstadoMensualidad, default: EstadoMensualidad.PENDIENTE })
  estado: EstadoMensualidad;

  @OneToMany(() => Pago, (pago) => pago.mensualidad)
  pagos: Pago[];
}
