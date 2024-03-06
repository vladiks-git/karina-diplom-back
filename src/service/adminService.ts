import { UserModel } from '../db/models.js';
import { IUser } from '../types/user.js';
import { Roles } from '../consts/common.js';

const getAllUsers = () => {
  return UserModel.findAll();
};

const createUser = (user: IUser) => {
  return UserModel.create(user);
};

const updateUser = (user: IUser) => {
  return UserModel.update({ ...user }, { where: { id: user.id } });
};

const createAdmin = () => {
  UserModel.create({
    email: 'admin',
    phone: '88888888888',
    role: Roles.ADMIN,
    password: 'admin',
    username: 'Админ Админович',
  });
};

const getAdmin = () => {
  return UserModel.findOne({ where: { role: Roles.ADMIN } });
};

const getUserById = (id: number) => {
  return UserModel.findOne({ where: { id: id } });
};

export const AdminService = {
  getAdmin,
  getAllUsers,
  createUser,
  updateUser,
  createAdmin,
  getUserById,
};
