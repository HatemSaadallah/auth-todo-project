import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Scopes,
} from 'sequelize-typescript';

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

@Table({
  tableName: 'Todos',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Todos extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.STRING)
  todoItem: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.STRING)
  createdBy: string;

  @Column(DataType.STRING)
  updatedBy: string;
}
