import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { UserService } from './modules/user/user.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CustomLogger } from './common/logger/winston.logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger
  });
  const userService = app.get(UserService);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalGuards(new AuthGuard(new Reflector()), new RolesGuard(new Reflector(), userService));
  await app.listen(3000);
}

bootstrap();
