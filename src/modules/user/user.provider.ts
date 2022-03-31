import { Users } from './user.model';

import { REPOSITORIES } from 'src/common/constants';

export const UserProvider = [
  {
    provide: REPOSITORIES.USER_REPOSITORY,
    useValue: Users,
  },
];
