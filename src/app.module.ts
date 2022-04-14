import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configFile from 'config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomLogger } from './common/logger/winston.logger';
import { DatabaseModule } from './modules/db/database.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CacheModule.register(),
    UserModule,
    DatabaseModule,
    TodoModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
      exitOnError: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
  exports: [CustomLogger],
})
export class AppModule {}