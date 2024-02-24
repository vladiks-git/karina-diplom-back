import express from 'express';
import bodyParser from 'body-parser';
import { connectDataBase, sequelize } from './db/dbConnect.js';
import { authRouter } from './routes/auth.js';
import { AdminService } from './service/adminService.js';
import { adminRouter } from './routes/admin.js';

// Инициализация приложения
const app = express();

app.use(bodyParser());
app.use(express.json());

// Роуты
app.use(authRouter);
app.use(adminRouter);

// DataBase
connectDataBase();
(async () => {
  try {
    await sequelize.sync({ force: true });
    // await sequelize.sync();
    // await UserService.createAdmin();
    // await UserService.createStudent();
    // await UserService.createResponsible();
    await AdminService.createAdmin();
    app.listen(6000);
    console.log('App listen on port - 6000');
  } catch (e) {
    console.log('Ошибка подключения к бд', e);
  }
})();
