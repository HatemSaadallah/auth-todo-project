import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CustomLogger } from './common/logger/winston.logger';
import { UserService } from './modules/user/user.service';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger
  });
  const userService = app.get(UserService);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalGuards(new AuthGuard(userService, new Reflector(), app.get(ConfigService)), new RolesGuard(new Reflector()));
  await app.listen(3000);
}

bootstrap();
