import { UserModel } from '../db/models.js';

const getUserByEmail = (email: string) => {
  return UserModel.findOne({ where: { email: email } });
};

const checkIsExist = (email: string) => {
  return UserModel.findOne({ where: { email: email } });
};

export const AuthService = {
  getUserByEmail,
  checkIsExist,
};
