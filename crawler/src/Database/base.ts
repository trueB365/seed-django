import { Model, Column } from 'sequelize-typescript';

// @ts-ignore
export class Base<T> extends Model<T> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
}

export const enumToStringArray = (enumType: object): string[] => Object.values(enumType);
