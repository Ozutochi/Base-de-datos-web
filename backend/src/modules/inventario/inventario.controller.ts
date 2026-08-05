import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto, CreateAsignacionDto } from './dto/inventario.dtos';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post('articulos')
  createInventario(@Body() dto: CreateInventarioDto) {
    return this.inventarioService.createInventario(dto);
  }
  @Get('articulos')
  findAllInventarios() {
    return this.inventarioService.findAllInventarios();
  }
  @Patch('articulos/:id')
  updateInventario(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.inventarioService.updateInventario(id, dto);
  }
  @Delete('articulos/:id')
  removeInventario(@Param('id', ParseIntPipe) id: number) {
    return this.inventarioService.removeInventario(id);
  }

  @Post('asignaciones')
  createAsignacion(@Body() dto: CreateAsignacionDto) {
    return this.inventarioService.createAsignacion(dto);
  }
  @Get('asignaciones')
  findAllAsignaciones() {
    return this.inventarioService.findAllAsignaciones();
  }
  @Patch('asignaciones/:id')
  updateAsignacion(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.inventarioService.updateAsignacion(id, dto);
  }
  @Delete('asignaciones/:id')
  removeAsignacion(@Param('id', ParseIntPipe) id: number) {
    return this.inventarioService.removeAsignacion(id);
  }
}
