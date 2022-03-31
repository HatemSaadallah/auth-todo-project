import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/db/database.module';
import { UserModule } from './modules/user/user.module';
import configFile from 'config';
import { TodoModule } from './modules/todo/todo.module';


@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TodoModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}