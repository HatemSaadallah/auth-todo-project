import { NestFactory, Reflector } from '@nestjs/core';
import { CACHE_MANAGER } from '@nestjs/common';

import { AppModule } from './app.module';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CustomLogger } from './common/logger/winston.logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger
  });
  const cacheManager = app.get(CACHE_MANAGER);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalGuards(new AuthGuard(new Reflector(), cacheManager), new RolesGuard(new Reflector(), cacheManager));
  await app.listen(3000);
}

bootstrap();
