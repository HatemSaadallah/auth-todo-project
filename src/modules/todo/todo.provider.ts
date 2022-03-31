import { Todos } from './todo.model';

import { REPOSITORIES } from 'src/common/constants';

export const TodoProvider = [
  {
    provide: REPOSITORIES.TODO_REPOSITORY,
    useValue: Todos,
  },
];
