import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Usuario } from './usuario.entity';

export enum EstadoPersonalCategoria {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
}

@Entity('personal_categoria')
export class PersonalCategoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.personal)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column()
  usuario_id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.personal_categorias)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'varchar', length: 50 })
  cargo: string;

  @Column({ type: 'date' })
  fecha_asignacion: string;

  @Column({ type: 'enum', enum: EstadoPersonalCategoria, default: EstadoPersonalCategoria.ACTIVO })
  estado: EstadoPersonalCategoria;
}
