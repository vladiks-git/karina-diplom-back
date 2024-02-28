import { ProjectModel, TaskModel, UserModel } from '../db/models.js';
import { ITask } from '../types/task.js';
import { IProject } from '../types/project.js';
import { Roles } from '../consts/common.js';

const getAllProjects = () => {
  return ProjectModel.findAll();
};

const getCounterpartyById = (id: number) => {
  return UserModel.findOne({ where: { id: id } });
};

const saveTask = (task: ITask) => {
  return TaskModel.create(task);
};

const saveProject = (project: IProject) => {
  return ProjectModel.create(project);
};

const getAllEmployers = () => {
  return UserModel.findAll({ where: { role: Roles.EMPLOYER } });
};

const getAllCounterparties = () => {
  return UserModel.findAll({ where: { role: Roles.COUNTERPARTY } });
};

const getProjectById = (id: number) => {
  return ProjectModel.findOne({ where: { id: id } });
};

const getTasksByProjectId = (id: number) => {
  return TaskModel.findAll({ where: { projectId: id } });
};

export const ProjectManagerService = {
  getAllProjects,
  getCounterpartyById,
  saveTask,
  saveProject,
  getAllEmployers,
  getAllCounterparties,
  getProjectById,
  getTasksByProjectId,
};
