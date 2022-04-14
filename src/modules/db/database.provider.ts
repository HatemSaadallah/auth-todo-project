import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { DATABASE_CONFIG, PROVIDERS } from '../../common/constants';
import { Todos } from '../todo/todo.model';
import { Users } from '../user/user.model';



export const databaseProvider = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(DATABASE_CONFIG),
      });
      sequelize.addModels([Users, Todos]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
