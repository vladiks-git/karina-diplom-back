import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface ITask {
  id?: number;
  name: string;
  description: string;
  endDate: string;
  isDone: boolean;
  projectId: number;
}

export interface ITaskModel
  extends ITask,
    Model<InferAttributes<ITaskModel>, InferCreationAttributes<ITaskModel>> {}
