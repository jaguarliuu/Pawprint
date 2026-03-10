import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const frontendPath = join(__dirname, '..', '..', 'frontend', 'dist');
  console.log('Frontend path:', frontendPath);
  
  // 静态文件 - 必须在 API 路由之前
  app.useStaticAssets(frontendPath, { prefix: '/' });

  // CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🐾 Pawprint backend running on http://localhost:${port}`);
}

bootstrap();
