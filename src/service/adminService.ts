import { UserModel } from '../db/models.js';
import { IUser } from '../types/user.js';

const getAllUsers = () => {
  return UserModel.findAll();
};

const createUser = (user: IUser) => {
  return UserModel.create(user);
};

const updateUser = (user: IUser) => {
  return UserModel.update({ ...user }, { where: { id: user.id } });
};

export const AdminService = {
  getAllUsers,
  createUser,
  updateUser,
};
