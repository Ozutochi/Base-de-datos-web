import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Prefijo global para las rutas (ej. /api/academico/...)
  app.setGlobalPrefix('api');
  
  // Habilitar validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remueve propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza error si envían propiedades no definidas
    transform: true, // Transforma los payloads a las instancias de los DTOs
  }));

  app.enableCors(); // Útil para conectar con el frontend en React
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
