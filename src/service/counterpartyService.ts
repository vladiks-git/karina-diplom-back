import { ProjectModel, TaskModel } from '../db/models.js';

const getProjectById = (id: number) => {
  return ProjectModel.findAll({ where: { counterpartyId: id } });
};

const getTasksByProjectId = (id: number) => {
  return TaskModel.findAll({ where: { projectId: id } });
};

export const CounterpartyService = {
  getProjectById,
  getTasksByProjectId,
};
