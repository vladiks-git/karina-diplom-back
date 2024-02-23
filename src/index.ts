import express from 'express';
import bodyParser from 'body-parser';
import { connectDataBase, sequelize } from './db/dbConnect.js';
import { authRouter } from './routes/auth.js';

// Инициализация приложения
const app = express();

app.use(bodyParser());
app.use(express.json());

// Роуты
app.use(authRouter);

// DataBase
connectDataBase();
(async () => {
  await sequelize.sync({ force: true });
  // await sequelize.sync();
  // await UserService.createAdmin();
  // await UserService.createStudent();
  // await UserService.createResponsible();
  app.listen(6000);
  console.log('App listen on port - 6000');
})();
