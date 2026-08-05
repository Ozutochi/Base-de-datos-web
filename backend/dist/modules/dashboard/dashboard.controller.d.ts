import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getMetrics(): Promise<{
        totalEstudiantes: number;
        totalIngresosMes: number;
        equiposPrestados: number;
        inventarioCritico: number;
        proximosPartidos: import("../../entities/partido.entity").Partido[];
        deudasPendientes: import("../../entities/mensualidad.entity").Mensualidad[];
    }>;
}
