import { Request, Router } from 'express';
import { ProjectManagerService } from '../service/projectManagerService.js';
import { IUserModel } from '../types/user.js';
import { IProject } from '../types/project.js';
import { ITask } from '../types/task.js';

interface CreateProjectRequest extends Omit<IProject, 'id'> {
  tasks: Array<Omit<ITask, 'projectId'>>;
}

export const projectManagerRouter = Router();

// все проекты
projectManagerRouter.get('/api/manager/projects', async (req, res) => {
  try {
    const projects = await ProjectManagerService.getAllProjects();
    const counterpartiesMap: Record<number, IUserModel> = {};
    const mappedProjects = await Promise.all(
      projects.map(async (project) => {
        const counterpartyId = project.counterpartyId;
        // сначала ищем в мапе
        if (counterpartiesMap[counterpartyId]) {
          return {
            ...project,
            counterparty: counterpartiesMap[counterpartyId],
          };
          // если в мапе нет идем в бд
        } else {
          const currentCounterparty =
            await ProjectManagerService.getCounterpartyById(counterpartyId);
          if (currentCounterparty) {
            counterpartiesMap[counterpartyId] = currentCounterparty;
            return {
              ...project.dataValues,
              counterparty: currentCounterparty,
            };
          }
        }
      })
    );
    res.status(200).send(JSON.stringify(mappedProjects));
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
});

// создание проекта
projectManagerRouter.post(
  '/api/manager/create',
  async (req: Request<any, any, CreateProjectRequest>, res) => {
    try {
      const body = req.body;
      const tasks = body.tasks;
      const project: IProject = {
        counterpartyId: body.counterpartyId,
        status: body.status,
        name: body.name,
        employerId: body.employerId,
      };
      const savedProject = await ProjectManagerService.saveProject(project);
      tasks.forEach((task) => {
        if (savedProject.id) {
          ProjectManagerService.saveTask({
            ...task,
            projectId: savedProject.id,
          });
        }
      });
      res.status(201).send({});
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);

// все сотрудники
projectManagerRouter.get('/api/manager/employers', async (req, res) => {
  try {
    const allEmployers = await ProjectManagerService.getAllEmployers();
    res.status(200).send(JSON.stringify(allEmployers));
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
});

// все контрагенты
projectManagerRouter.get('/api/manager/counterparties', async (req, res) => {
  try {
    const allEmployers = await ProjectManagerService.getAllCounterparties();
    res.status(200).send(JSON.stringify(allEmployers));
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
});

// удаление проекта
projectManagerRouter.post(
  '/api/manager/delete',
  async (req: Request<any, any, { id: number }>, res) => {
    try {
      const id = req.body.id;
      const project = await ProjectManagerService.getProjectById(id);
      if (project) {
        await project.destroy();
        res.status(200).send({});
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);

// редактирование проекта
projectManagerRouter.get(
  '/api/manager/projects/:id',
  async (req: Request<{ id: string }>, res) => {
    try {
      const id = req.params.id;
      const project = await ProjectManagerService.getProjectById(+id);
      if (project && project.id) {
        const tasksByProjectId =
          await ProjectManagerService.getTasksByProjectId(project.id);
        const mappedTasks = tasksByProjectId.map((task) => task.dataValues);
        res.status(200).send(
          JSON.stringify({
            ...project.dataValues,
            tasks: mappedTasks,
          })
        );
      } else {
        res.status(500).send({ message: 'Проект не найден' });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);
