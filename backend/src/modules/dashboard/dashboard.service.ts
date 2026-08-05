import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, In, Between } from 'typeorm';
import { Estudiante } from '../../entities/estudiante.entity';
import { Pago, EstadoPago } from '../../entities/pago.entity';
import { Inventario, EstadoFisico } from '../../entities/inventario.entity';
import { AsignacionEquipamiento, EstadoAsignacion } from '../../entities/asignacion-equipamiento.entity';
import { Partido, EstadoPartido } from '../../entities/partido.entity';
import { Mensualidad, EstadoMensualidad } from '../../entities/mensualidad.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
    @InjectRepository(Pago)
    private readonly pagoRepo: Repository<Pago>,
    @InjectRepository(Inventario)
    private readonly inventarioRepo: Repository<Inventario>,
    @InjectRepository(AsignacionEquipamiento)
    private readonly asignacionRepo: Repository<AsignacionEquipamiento>,
    @InjectRepository(Partido)
    private readonly partidoRepo: Repository<Partido>,
    @InjectRepository(Mensualidad)
    private readonly mensualidadRepo: Repository<Mensualidad>,
  ) {}

  async getMetrics() {
    // 1. Total Estudiantes Activos
    const totalEstudiantes = await this.estudianteRepo.count({
      where: { estado: 'Activo' as any }, 
    });

    // 2. Ingresos del mes
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];

    const pagos = await this.pagoRepo.find({
      where: {
        estado_pago: EstadoPago.APROBADO,
        fecha_pago: Between(firstDay, lastDay),
      },
    });
    
    let totalIngresosMes = 0;
    pagos.forEach(p => {
      totalIngresosMes += Number(p.monto_pagado);
    });

    // 3. Equipos en prestamo
    const equiposPrestados = await this.asignacionRepo.count({
      where: { estado: EstadoAsignacion.ASIGNADO },
    });

    // 4. Inventario Critico
    const inventarioCritico = await this.inventarioRepo.count({
      where: { estado_fisico: In([EstadoFisico.MALO, EstadoFisico.REGULAR]) },
    });

    // 5. Proximos partidos
    const today = new Date().toISOString().split('T')[0];
    const proximosPartidos = await this.partidoRepo.find({
      where: {
        fecha: MoreThanOrEqual(today),
        estado_partido: EstadoPartido.PROGRAMADO
      },
      order: { fecha: 'ASC', hora: 'ASC' },
      take: 3,
      relations: { categoria: true }
    });

    // 6. Deudas pendientes
    const deudasPendientes = await this.mensualidadRepo.find({
      where: { estado: In([EstadoMensualidad.PENDIENTE, EstadoMensualidad.VENCIDA]) },
      order: { anio: 'ASC', mes: 'ASC' },
      take: 5,
      relations: { estudiante: true, tarifa: true }
    });

    return {
      totalEstudiantes,
      totalIngresosMes,
      equiposPrestados,
      inventarioCritico,
      proximosPartidos,
      deudasPendientes
    };
  }
}
