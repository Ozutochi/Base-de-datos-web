import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Rol } from './entities/rol.entity';
import { Usuario } from './entities/usuario.entity';
import { Categoria } from './entities/categoria.entity';
import { Tarifa } from './entities/tarifa.entity';
import { Estudiante } from './entities/estudiante.entity';
import { FichaMedica } from './entities/ficha-medica.entity';
import { PersonalCategoria } from './entities/personal-categoria.entity';
import { SesionEntrenamiento } from './entities/sesion-entrenamiento.entity';
import { Partido } from './entities/partido.entity';
import { Asistencia } from './entities/asistencia.entity';
import { Inventario } from './entities/inventario.entity';
import { AsignacionEquipamiento } from './entities/asignacion-equipamiento.entity';
import { Mensualidad } from './entities/mensualidad.entity';
import { Pago } from './entities/pago.entity';
import { SolicitudInscripcion } from './entities/solicitud-inscripcion.entity';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AcademicoModule } from './modules/academico/academico.module';
import { DeportivoModule } from './modules/deportivo/deportivo.module';
import { FinancieroModule } from './modules/financiero/financiero.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'escuela_futbol_db',
      entities: [
        Rol,
        Usuario,
        Categoria,
        Tarifa,
        Estudiante,
        FichaMedica,
        PersonalCategoria,
        SesionEntrenamiento,
        Partido,
        Asistencia,
        Inventario,
        AsignacionEquipamiento,
        Mensualidad,
        Pago,
        SolicitudInscripcion,
      ],
      synchronize: true, // Esto creará las tablas automáticamente basadas en las entidades
    }),
    UsuariosModule,
    AcademicoModule,
    DeportivoModule,
    FinancieroModule,
    InventarioModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
