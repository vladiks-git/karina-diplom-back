import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { Roles } from '../consts/common.js';

export interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  phone: string;
  role: Roles;
}

export interface IUserModel
  extends IUser,
    Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {}
