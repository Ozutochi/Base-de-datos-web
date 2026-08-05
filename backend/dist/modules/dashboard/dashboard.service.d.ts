import { Repository } from 'typeorm';
import { Estudiante } from '../../entities/estudiante.entity';
import { Pago } from '../../entities/pago.entity';
import { Inventario } from '../../entities/inventario.entity';
import { AsignacionEquipamiento } from '../../entities/asignacion-equipamiento.entity';
import { Partido } from '../../entities/partido.entity';
import { Mensualidad } from '../../entities/mensualidad.entity';
export declare class DashboardService {
    private readonly estudianteRepo;
    private readonly pagoRepo;
    private readonly inventarioRepo;
    private readonly asignacionRepo;
    private readonly partidoRepo;
    private readonly mensualidadRepo;
    constructor(estudianteRepo: Repository<Estudiante>, pagoRepo: Repository<Pago>, inventarioRepo: Repository<Inventario>, asignacionRepo: Repository<AsignacionEquipamiento>, partidoRepo: Repository<Partido>, mensualidadRepo: Repository<Mensualidad>);
    getMetrics(): Promise<{
        totalEstudiantes: number;
        totalIngresosMes: number;
        equiposPrestados: number;
        inventarioCritico: number;
        proximosPartidos: Partido[];
        deudasPendientes: Mensualidad[];
    }>;
}
