import { DataTypes } from 'sequelize';
import { sequelize } from './dbConnect.js';
import { IUserModel } from '../types/user.js';
import { ITaskModel } from '../types/task.js';
import { IProjectModel } from '../types/project.js';

// USER MODEL
export const UserModel = sequelize.define<IUserModel>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// TASK MODEL

export const TaskModel = sequelize.define<ITaskModel>('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
  },
  projectId: {
    type: DataTypes.INTEGER,
  },
});

// PROJECT MODEL

export const ProjectModel = sequelize.define<IProjectModel>('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  counterpartyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // tasksIds: {
  //   type: DataTypes.ARRAY(DataTypes.INTEGER),
  // },
});

ProjectModel.hasMany(TaskModel);
TaskModel.belongsTo(ProjectModel, {
  foreignKey: 'projectId',
  onDelete: 'CASCADE',
});
