import { ProjectModel, TaskModel } from '../db/models.js';
import { ProjectStatuses } from '../consts/common.js';

const getProjectsById = (id: number) => {
  return ProjectModel.findAll({
    where: {
      counterpartyId: id,
      status: ProjectStatuses.IN_WORK || ProjectStatuses.SOLVED,
    },
  });
};

const getTasksByProjectId = (id: number) => {
  return TaskModel.findAll({ where: { projectId: id } });
};

export const CounterpartyService = {
  getProjectsById,
  getTasksByProjectId,
};
