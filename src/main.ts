import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { CustomLogger } from './common/logger/winston.logger';
import { UserService } from './modules/user/user.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  const userService = app.get(UserService);
  const configService = app.get(ConfigService);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalGuards(new AuthGuard(userService, new Reflector(), app.get(ConfigService)), new RolesGuard(new Reflector()));
  await app.listen(configService.get('PORT'));
}

bootstrap();
