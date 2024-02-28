import { ProjectStatuses } from '../consts/common.js';
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface IProject {
  id?: number;
  name: string;
  status: ProjectStatuses;
  employerId: number;
  counterpartyId: number;
  // tasksIds: number[];
}

export interface IProjectModel
  extends IProject,
    Model<
      InferAttributes<IProjectModel>,
      InferCreationAttributes<IProjectModel>
    > {}
