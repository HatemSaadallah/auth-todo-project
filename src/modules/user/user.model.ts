import { Model, Column, PrimaryKey, AutoIncrement, DataType, Table, ForeignKey } from 'sequelize-typescript';
@Table({
    tableName: 'Users',
    timestamps: true,
    underscored: true,
    paranoid: true,
})
export class Users extends Model {
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
    createdBy: string;

    @Column(DataType.STRING)
    updatedBy: string;

    @Column(DataType.STRING)
    role: string;
}