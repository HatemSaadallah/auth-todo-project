import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/db/database.module';
import { UserModule } from './modules/user/user.module';
import configFile from 'config';
import { TodoModule } from './modules/todo/todo.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

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
  providers: [AppService],
  
})
export class AppModule {}