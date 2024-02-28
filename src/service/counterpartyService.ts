import { ProjectModel, TaskModel } from '../db/models.js';

const getProjectById = (id: number) => {
  return ProjectModel.findOne({ where: { id: id } });
};

const getTasksByProjectId = (id: number) => {
  return TaskModel.findAll({ where: { projectId: id } });
};

export const CounterpartyService = {
  getProjectById,
  getTasksByProjectId,
};
