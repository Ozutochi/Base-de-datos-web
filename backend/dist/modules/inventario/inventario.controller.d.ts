import { InventarioService } from './inventario.service';
import { CreateInventarioDto, CreateAsignacionDto } from './dto/inventario.dtos';
export declare class InventarioController {
    private readonly inventarioService;
    constructor(inventarioService: InventarioService);
    createInventario(dto: CreateInventarioDto): Promise<import("../../entities/inventario.entity").Inventario>;
    findAllInventarios(): Promise<import("../../entities/inventario.entity").Inventario[]>;
    updateInventario(id: number, dto: any): Promise<import("../../entities/inventario.entity").Inventario>;
    removeInventario(id: number): Promise<void>;
    createAsignacion(dto: CreateAsignacionDto): Promise<import("../../entities/asignacion-equipamiento.entity").AsignacionEquipamiento>;
    findAllAsignaciones(): Promise<import("../../entities/asignacion-equipamiento.entity").AsignacionEquipamiento[]>;
    updateAsignacion(id: number, dto: any): Promise<import("../../entities/asignacion-equipamiento.entity").AsignacionEquipamiento>;
    removeAsignacion(id: number): Promise<void>;
}
