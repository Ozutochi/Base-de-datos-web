import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Mensualidad } from './mensualidad.entity';

export enum EstadoPago {
  EN_REVISION = 'En Revisión',
  APROBADO = 'Aprobado',
  RECHAZADO = 'Rechazado',
}

@Entity('pago')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  representante_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pagos_realizados)
  @JoinColumn({ name: 'representante_id' })
  representante: Usuario;

  @Column()
  mensualidad_id: number;

  @ManyToOne(() => Mensualidad, (mensualidad) => mensualidad.pagos)
  @JoinColumn({ name: 'mensualidad_id' })
  mensualidad: Mensualidad;

  @Column({ nullable: true })
  verificado_por_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pagos_verificados)
  @JoinColumn({ name: 'verificado_por_id' })
  verificador: Usuario;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto_pagado: number;

  @Column({ type: 'varchar', length: 3 })
  moneda: string;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  tasa_cambio: number;

  @Column({ type: 'varchar', length: 50 })
  metodo_pago: string;

  @Column({ type: 'varchar', length: 100 })
  numero_referencia: string;

  @Column({ type: 'varchar', length: 50 })
  numero_cuenta: string;

  @Column({ type: 'date' })
  fecha_pago: string;

  @Column({ type: 'enum', enum: EstadoPago, default: EstadoPago.EN_REVISION })
  estado_pago: EstadoPago;
}
