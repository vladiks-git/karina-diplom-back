import { Router, Request } from 'express';
import { AuthService } from '../service/authService.js';
import { IUser } from '../types/user.js';

export const authRouter = Router();

// Контроллер авторизации
authRouter.post(
  '/api/auth',
  async (req: Request<any, any, Pick<IUser, 'password' | 'email'>>, res) => {
    const body = req.body;
    try {
      const currentUser = await AuthService.getUserByEmail(body.email);

      if (currentUser !== null) {
        const isValidPassword = currentUser.password === body.password;
        if (!isValidPassword) {
          res.status(401).send({ message: 'Неверный логин или пароль' });
          return;
        }
        // тут юзер авторизирован
        return;
      }
      res.status(401).send({ message: 'Неверный логин или пароль' });
    } catch (e) {
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);
