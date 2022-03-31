import { ConfigService } from '@nestjs/config';

import { Sequelize } from 'sequelize-typescript';

import { PROVIDERS, DATABASE_CONFIG } from '../../common/constants';

import { Users } from '../user/user.model';
import { Todos } from '../todo/todo.model';
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
