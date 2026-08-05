import { Repository } from 'typeorm';
import { Inventario } from '../../entities/inventario.entity';
import { AsignacionEquipamiento } from '../../entities/asignacion-equipamiento.entity';
import { CreateInventarioDto, CreateAsignacionDto } from './dto/inventario.dtos';
export declare class InventarioService {
    private readonly inventarioRepo;
    private readonly asignacionRepo;
    constructor(inventarioRepo: Repository<Inventario>, asignacionRepo: Repository<AsignacionEquipamiento>);
    createInventario(dto: CreateInventarioDto): Promise<Inventario>;
    findAllInventarios(): Promise<Inventario[]>;
    updateInventario(id: number, dto: any): Promise<Inventario>;
    removeInventario(id: number): Promise<void>;
    createAsignacion(dto: CreateAsignacionDto): Promise<AsignacionEquipamiento>;
    findAllAsignaciones(): Promise<AsignacionEquipamiento[]>;
    updateAsignacion(id: number, dto: any): Promise<AsignacionEquipamiento>;
    removeAsignacion(id: number): Promise<void>;
}
