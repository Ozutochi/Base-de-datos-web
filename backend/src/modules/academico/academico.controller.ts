import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { AcademicoService } from './academico.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { CreateCategoriaDto, UpdateFichaMedicaDto, CreatePersonalCategoriaDto } from './dto/academico.dtos';

@Controller('academico')
export class AcademicoController {
  constructor(private readonly academicoService: AcademicoService) {}

  // --- ESTUDIANTES ---
  @Post('estudiantes')
  createEstudiante(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.academicoService.createEstudiante(createEstudianteDto);
  }

  @Get('estudiantes')
  findAllEstudiantes() {
    return this.academicoService.findAllEstudiantes();
  }

  @Get('estudiantes/:id')
  findOneEstudiante(@Param('id', ParseIntPipe) id: number) {
    return this.academicoService.findOneEstudiante(id);
  }

  @Patch('estudiantes/:id')
  updateEstudiante(@Param('id', ParseIntPipe) id: number, @Body() updateDto: any) {
    return this.academicoService.updateEstudiante(id, updateDto);
  }

  @Delete('estudiantes/:id')
  removeEstudiante(@Param('id', ParseIntPipe) id: number) {
    return this.academicoService.removeEstudiante(id);
  }

  // --- CATEGORIAS ---
  @Post('categorias')
  createCategoria(@Body() dto: CreateCategoriaDto) {
    return this.academicoService.createCategoria(dto);
  }

  @Get('categorias')
  findAllCategorias() {
    return this.academicoService.findAllCategorias();
  }

  @Get('categorias/:id')
  findOneCategoria(@Param('id', ParseIntPipe) id: number) {
    return this.academicoService.findOneCategoria(id);
  }

  @Patch('categorias/:id')
  updateCategoria(@Param('id', ParseIntPipe) id: number, @Body() updateDto: any) {
    return this.academicoService.updateCategoria(id, updateDto);
  }

  @Delete('categorias/:id')
  removeCategoria(@Param('id', ParseIntPipe) id: number) {
    return this.academicoService.removeCategoria(id);
  }

  // --- FICHAS MEDICAS ---
  @Get('fichas-medicas')
  findAllFichasMedicas() {
    return this.academicoService.findAllFichasMedicas();
  }
  @Patch('fichas-medicas/:id')
  updateFichaMedica(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFichaMedicaDto) {
    return this.academicoService.updateFichaMedica(id, dto);
  }

  // --- PERSONAL CATEGORIA ---
  @Get('personal')
  findAllAsignaciones() {
    return this.academicoService.findAllAsignaciones();
  }

  @Post('personal')
  asignarPersonal(@Body() dto: CreatePersonalCategoriaDto) {
    return this.academicoService.asignarPersonal(dto);
  }

  @Delete('personal/:id')
  removeAsignacion(@Param('id', ParseIntPipe) id: number) {
    return this.academicoService.removeAsignacion(id);
  }
}
