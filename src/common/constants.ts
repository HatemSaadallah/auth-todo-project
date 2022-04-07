export const PROVIDERS = {
    DATABASE_PROVIDER: 'DbConnection',
};
export const DATABASE_CONFIG = 'database';


export const REPOSITORIES = {
    USER_REPOSITORY: 'USER_REPOSITORY',
    TODO_REPOSITORY: 'TODO_REPOSITORY',
};

export interface UserObject {
    id: number;
    username: string;
    token: string;
};

export enum RoleStatus {
    ADMIN = 'admin',
    USER = 'user',
}
