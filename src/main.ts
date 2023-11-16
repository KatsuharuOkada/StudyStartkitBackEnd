import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './vendors/filters/http-exception.filter';
import { LoggingInterceptor } from './vendors/interceptors/logging.interceptor';
import { Logger } from './common/logger/logger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger });

  app.enableCors({ maxAge: 86400 });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const port = parseInt(process.env.APP_PORT, 10) || 3000;
  await app.listen(port, '0.0.0.0', () => {
    logger.log(`Service started successfully at port ${port}`);
  });
}

// tslint:disable-next-line: no-floating-promises
bootstrap();
