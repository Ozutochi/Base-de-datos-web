import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicoController } from './academico.controller';
import { AcademicoService } from './academico.service';
import { Estudiante } from '../../entities/estudiante.entity';
import { FichaMedica } from '../../entities/ficha-medica.entity';
import { Categoria } from '../../entities/categoria.entity';
import { PersonalCategoria } from '../../entities/personal-categoria.entity';
import { SolicitudInscripcion } from '../../entities/solicitud-inscripcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, FichaMedica, Categoria, PersonalCategoria, SolicitudInscripcion])],
  controllers: [AcademicoController],
  providers: [AcademicoService]
})
export class AcademicoModule {}
