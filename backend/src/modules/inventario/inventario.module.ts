import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { Inventario } from '../../entities/inventario.entity';
import { AsignacionEquipamiento } from '../../entities/asignacion-equipamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventario, AsignacionEquipamiento])],
  controllers: [InventarioController],
  providers: [InventarioService]
})
export class InventarioModule {}
