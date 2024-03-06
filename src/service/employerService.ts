import { ProjectModel, TaskModel, UserModel } from '../db/models.js';

const getProjectsByEmployerId = (id: number) => {
  return ProjectModel.findAll({ where: { employerId: id } });
};

const getCounterPartyById = (id: number) => {
  return UserModel.findOne({ where: { id: id } });
};

const getProjectById = (id: number) => {
  return ProjectModel.findOne({ where: { id: id } });
};

const getTasksByProjectId = (id: number) => {
  return TaskModel.findAll({ where: { projectId: id } });
};

export const EmployerService = {
  getProjectsByEmployerId,
  getCounterPartyById,
  getProjectById,
  getTasksByProjectId,
};
