import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthGuard } from './common/guards/auth.guard';
import { UserService } from './modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UserService);

  app.useGlobalGuards(new AuthGuard(new Reflector()));
  app.useGlobalGuards(new RolesGuard(new Reflector(), userService));
  await app.listen(3000);
}
bootstrap();