import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './vendors/interceptors/logging.interceptor';
import { ValidationPipe } from './vendors/pipes/validation.pipe';
import { Logger } from './common/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger()
    // cors: true,
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000, '0.0.0.0', () => {
    new Logger().debug('Service started successfully!');
  });
}

// tslint:disable-next-line: no-floating-promises
bootstrap();
