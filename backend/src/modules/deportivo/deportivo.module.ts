import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeportivoController } from './deportivo.controller';
import { DeportivoService } from './deportivo.service';
import { SesionEntrenamiento } from '../../entities/sesion-entrenamiento.entity';
import { Partido } from '../../entities/partido.entity';
import { Asistencia } from '../../entities/asistencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SesionEntrenamiento, Partido, Asistencia])],
  controllers: [DeportivoController],
  providers: [DeportivoService]
})
export class DeportivoModule {}
