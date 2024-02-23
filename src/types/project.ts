import { ProjectStatuses } from '../consts/common.js';

export interface IProject {
  id: number;
  name: string;
  status: ProjectStatuses;
}
