import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
app.enableCors({
  origin: [
    'http://localhost:3000',         // local dev
    'https://jobapp-phi.vercel.app',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log('Application is running on: http://localhost:3001');
}
bootstrap();
