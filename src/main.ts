import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initializeTransactionalContext } from 'typeorm-transactional';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../service-account.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

async function bootstrap() {
  initializeTransactionalContext();

  process.env.TZ = 'UTC';

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.enableCors();
  app.set('trust proxy', 1);

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      exposeUnsetFields: false,
    }),
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const options = new DocumentBuilder()
    .setTitle('Padel Mate')
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const config = app.get(ConfigService);

  const apiPort = parseInt(config.get('API_PORT'));

  await app.listen(apiPort);

  return [apiPort];
}

bootstrap().then(([apiPort]) =>
  console.log(
    `Api successfully started on port ${apiPort}. Instance ID : ${process.env.NODE_APP_INSTANCE}`,
  ),
);
