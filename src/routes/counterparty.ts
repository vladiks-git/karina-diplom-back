import { Request, Router } from 'express';
import { CounterpartyService } from '../service/counterpartyService.js';

export const counterpartyRouter = Router();

counterpartyRouter.get(
  '/api/counterparty/:id',
  async (req: Request<{ id: string }>, res) => {
    try {
      const id = req.params.id;
      const currentProject = await CounterpartyService.getProjectById(+id);
      if (currentProject && currentProject.id) {
        const tasksByProjectId = await CounterpartyService.getTasksByProjectId(
          currentProject.id
        );
        res.status(200).send(JSON.stringify(tasksByProjectId));
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  }
);
