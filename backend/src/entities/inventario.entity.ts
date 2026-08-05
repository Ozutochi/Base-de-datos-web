import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Usuario } from './usuario.entity';
import { AsignacionEquipamiento } from './asignacion-equipamiento.entity';

export enum EstadoFisico {
  BUENO = 'Bueno',
  REGULAR = 'Regular',
  MALO = 'Malo',
}

@Entity('inventario')
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  tipo_articulo: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_articulo: string;

  @Column({ type: 'int' })
  cantidad_disponible: number;

  @Column({ type: 'enum', enum: EstadoFisico, default: EstadoFisico.BUENO })
  estado_fisico: EstadoFisico;

  @Column({ type: 'date' })
  fecha_registro: string;

  @Column({ nullable: true })
  categoria_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.inventarios)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ nullable: true })
  responsable_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.inventarios_a_cargo)
  @JoinColumn({ name: 'responsable_id' })
  responsable: Usuario;

  @OneToMany(() => AsignacionEquipamiento, (asignacion) => asignacion.inventario)
  asignaciones: AsignacionEquipamiento[];
}
