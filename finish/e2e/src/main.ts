import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './vendors/filters/http-exception.filter';
import { LoggingInterceptor } from './vendors/interceptors/logging.interceptor';
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
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const port = process.env.APP_PORT;
  await app.listen(port, '0.0.0.0', () => {
    new Logger().debug(`Service started successfully at port ${port}`);
  });
}

// tslint:disable-next-line: no-floating-promises
bootstrap();
