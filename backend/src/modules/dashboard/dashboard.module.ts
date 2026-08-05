import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Estudiante } from '../../entities/estudiante.entity';
import { Pago } from '../../entities/pago.entity';
import { Inventario } from '../../entities/inventario.entity';
import { AsignacionEquipamiento } from '../../entities/asignacion-equipamiento.entity';
import { Partido } from '../../entities/partido.entity';
import { Mensualidad } from '../../entities/mensualidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Estudiante,
      Pago,
      Inventario,
      AsignacionEquipamiento,
      Partido,
      Mensualidad,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
