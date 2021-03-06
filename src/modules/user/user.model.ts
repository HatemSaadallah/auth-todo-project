import { AutoIncrement, Column, DataType, Model, PrimaryKey, Scopes, Table } from 'sequelize-typescript';
@Table({
    tableName: 'Users',
    timestamps: true,
    underscored: true,
    paranoid: true,
})
@Scopes(() => {
    return {
      basic: {
        attributes: {
          exclude: [
            'password',
          ],
        },
      },
    };
  })
  
export class Users extends Model<Users> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    username: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;

    @Column(DataType.STRING)
    createdBy: number;

    @Column(DataType.STRING)
    updatedBy: number;

    @Column(DataType.STRING)
    role: string;
}