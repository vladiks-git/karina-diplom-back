import { Router, Request } from 'express';
import { AdminService } from '../service/adminService.js';
import { IUser } from '../types/user.js';

export const adminRouter = Router();

// все пользователи
adminRouter.get('/api/admin/users', async (req, res) => {
  try {
    const users = await AdminService.getAllUsers();
    res.status(200).send(JSON.stringify(users));
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
});

// создание юзера

adminRouter.post(
  '/api/admin/create',
  async (req: Request<any, any, IUser>, res) => {
    try {
      const body = req.body;
      const createdUser = await AdminService.createUser(body);
      res.status(201).send(JSON.stringify(createdUser));
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);

// обновление юзера
adminRouter.patch(
  '/api/admin/update',
  async (req: Request<any, any, IUser>, res) => {
    try {
      const body = req.body;
      const updatedUser = await AdminService.updateUser(body);
      res.status(200).send({});
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);

adminRouter.get(
  '/api/admin/getById/:id',
  async (req: Request<{ id: string }>, res) => {
    try {
      const id = req.params.id;
      const user = await AdminService.getUserById(+id);
      if (user) {
        res.status(200).send(JSON.stringify(user));
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);

adminRouter.post(
  '/api/admin/delete',
  async (req: Request<any, any, { id: number }>, res) => {
    try {
      const id = req.body.id;
      const user = await AdminService.getUserById(id);
      if (user) {
        await user.destroy();
        res.status(200).send({});
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);
