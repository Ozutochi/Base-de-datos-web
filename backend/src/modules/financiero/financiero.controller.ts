import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { FinancieroService } from './financiero.service';
import { CreateTarifaDto, CreateMensualidadDto, CreatePagoDto } from './dto/financiero.dtos';

@Controller('financiero')
export class FinancieroController {
  constructor(private readonly financieroService: FinancieroService) {}

  @Post('tarifas')
  createTarifa(@Body() dto: CreateTarifaDto) {
    return this.financieroService.createTarifa(dto);
  }
  @Get('tarifas')
  findAllTarifas() {
    return this.financieroService.findAllTarifas();
  }
  @Patch('tarifas/:id')
  updateTarifa(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.financieroService.updateTarifa(id, dto);
  }
  @Delete('tarifas/:id')
  removeTarifa(@Param('id', ParseIntPipe) id: number) {
    return this.financieroService.removeTarifa(id);
  }

  @Post('mensualidades')
  createMensualidad(@Body() dto: CreateMensualidadDto) {
    return this.financieroService.createMensualidad(dto);
  }
  @Get('mensualidades')
  findAllMensualidades() {
    return this.financieroService.findAllMensualidades();
  }
  @Patch('mensualidades/:id')
  updateMensualidad(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.financieroService.updateMensualidad(id, dto);
  }
  @Delete('mensualidades/:id')
  removeMensualidad(@Param('id', ParseIntPipe) id: number) {
    return this.financieroService.removeMensualidad(id);
  }

  @Post('pagos')
  createPago(@Body() dto: CreatePagoDto) {
    return this.financieroService.createPago(dto);
  }
  @Get('pagos')
  findAllPagos() {
    return this.financieroService.findAllPagos();
  }
  @Patch('pagos/:id')
  updatePago(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.financieroService.updatePago(id, dto);
  }
  @Delete('pagos/:id')
  removePago(@Param('id', ParseIntPipe) id: number) {
    return this.financieroService.removePago(id);
  }
}
