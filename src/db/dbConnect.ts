import { Sequelize } from 'sequelize';

// Конфиг базы данных
export const sequelize = new Sequelize('karina', 'postgres', 'admin', {
  dialect: 'postgres',
});

// Подключения к базе данных
export const connectDataBase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с бд установлено.');
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
  }
};
