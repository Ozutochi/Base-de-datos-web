import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancieroController } from './financiero.controller';
import { FinancieroService } from './financiero.service';
import { Tarifa } from '../../entities/tarifa.entity';
import { Mensualidad } from '../../entities/mensualidad.entity';
import { Pago } from '../../entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarifa, Mensualidad, Pago])],
  controllers: [FinancieroController],
  providers: [FinancieroService]
})
export class FinancieroModule {}
