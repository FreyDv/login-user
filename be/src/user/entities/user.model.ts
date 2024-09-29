import { DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, Model, Sequelize, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: false,
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  scopes: {
    withPassword: { limit: 1 },
  },
})
export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataTypes.STRING(255), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataTypes.STRING(255), allowNull: false })
  password: string;

  @Column({ type: DataTypes.STRING(255), allowNull: false })
  name: string;

  @Column({
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'second_name',
    defaultValue: null,
  })
  secondName: string;

  @Column({ type: DataTypes.DATE, allowNull: true, field: 'birth_date' })
  birthDate: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()'),
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()'),
    field: 'updated_at',
  })
  updatedAt: Date;
}
