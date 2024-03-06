import { Request, Router } from 'express';
import { CounterpartyService } from '../service/counterpartyService.js';

export const counterpartyRouter = Router();

counterpartyRouter.get(
  '/api/counterparty/:id',
  async (req: Request<{ id: string }>, res) => {
    try {
      const id = req.params.id;
      const currentProjects = await CounterpartyService.getProjectById(+id);
      const body = await Promise.all(
        currentProjects.map(async (currentProject) => {
          if (currentProject.id) {
            const tasksByProjectId =
              await CounterpartyService.getTasksByProjectId(currentProject.id);
            return {
              ...currentProject.dataValues,
              tasks: tasksByProjectId,
            };
          }
        })
      );

      res.status(200).send(body);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);
