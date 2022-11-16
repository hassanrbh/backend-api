import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const config_ = new DocumentBuilder()
    .setTitle('Projects and Tasks Api')
    .setDescription('An api where can you create projects and their task')
    .setVersion('1.0')
    .addTag('projects')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config_);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(parseInt(process.env.PORT) || port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();
