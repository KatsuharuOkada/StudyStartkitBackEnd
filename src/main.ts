import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { GraphQLExceptionFilter } from './common/filters/graphql-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/responding.interceptor';
import { Logger } from './common/logger/logger';
import { ClassValidationPipe } from './common/pipes/class-validate.pipe';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
    cors: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ClassValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());
  app.useGlobalFilters(new GraphQLExceptionFilter());
  const port = parseInt(process.env.APP_PORT, 10) || 3000;
  await app.listen(port, '0.0.0.0', () => {
    new Logger().log(`Service started successfully at port: ${port}.`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

// tslint:disable-next-line: no-floating-promises
bootstrap();
