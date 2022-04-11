import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';


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

  @Column(DataType.INTEGER)
  createdBy: number;

  @Column(DataType.INTEGER)
  updatedBy: number;
}
