import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { DeportivoService } from './deportivo.service';
import { CreateSesionDto, CreatePartidoDto, CreateAsistenciaDto } from './dto/deportivo.dtos';

@Controller('deportivo')
export class DeportivoController {
  constructor(private readonly deportivoService: DeportivoService) {}

  @Post('sesiones')
  createSesion(@Body() dto: CreateSesionDto) {
    return this.deportivoService.createSesion(dto);
  }
  @Get('sesiones')
  findAllSesiones() {
    return this.deportivoService.findAllSesiones();
  }
  @Patch('sesiones/:id')
  updateSesion(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.deportivoService.updateSesion(id, dto);
  }
  @Delete('sesiones/:id')
  removeSesion(@Param('id', ParseIntPipe) id: number) {
    return this.deportivoService.removeSesion(id);
  }

  @Post('partidos')
  createPartido(@Body() dto: CreatePartidoDto) {
    return this.deportivoService.createPartido(dto);
  }
  @Get('partidos')
  findAllPartidos() {
    return this.deportivoService.findAllPartidos();
  }
  @Patch('partidos/:id')
  updatePartido(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.deportivoService.updatePartido(id, dto);
  }
  @Delete('partidos/:id')
  removePartido(@Param('id', ParseIntPipe) id: number) {
    return this.deportivoService.removePartido(id);
  }

  @Post('asistencias')
  registrarAsistencia(@Body() dto: CreateAsistenciaDto) {
    return this.deportivoService.registrarAsistencia(dto);
  }
  @Get('asistencias')
  findAllAsistencias() {
    return this.deportivoService.findAllAsistencias();
  }
  @Patch('asistencias/:id')
  updateAsistencia(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.deportivoService.updateAsistencia(id, dto);
  }
  @Delete('asistencias/:id')
  removeAsistencia(@Param('id', ParseIntPipe) id: number) {
    return this.deportivoService.removeAsistencia(id);
  }
}
