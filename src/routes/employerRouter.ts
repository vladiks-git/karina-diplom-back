import { Request, Router } from 'express';
import { EmployerService } from '../service/employerService.js';

export const employerRouter = Router();

employerRouter.get(
  '/api/employer/projects/:id',
  async (req: Request<{ id: string }>, res) => {
    try {
      const employerId = req.params.id;
      const currentProjects = await EmployerService.getProjectsByEmployerId(
        +employerId
      );

      const body =
        (await Promise.all(
          currentProjects.map(async (project) => {
            const currentCounterparty =
              await EmployerService.getCounterPartyById(project.counterpartyId);
            if (currentCounterparty) {
              return {
                ...project.dataValues,
                counterpartyName: currentCounterparty.username,
              };
            }
          })
        )) || [];
      res.status(200).send(body);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);

// получение проекта по ид
employerRouter.get(
  '/api/employer/project/:id',
  async (req: Request<{ id: string }>, res) => {
    try {
      const id = req.params.id;
      const project = await EmployerService.getProjectById(+id);
      if (project && project.id) {
        const tasksByProjectId = await EmployerService.getTasksByProjectId(
          project.id
        );
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
