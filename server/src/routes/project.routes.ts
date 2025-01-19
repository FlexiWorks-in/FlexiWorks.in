import { Router } from 'express';

import { validateData } from '../middlewares';
import {
  addProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import projectSchema from '../schemas/projectSchema';
import authRequired from '../middlewares/authRequired.middleware';

const router = Router();

router.use(authRequired);

router
  .route('/')
  .get(getProjects)
  .post(validateData(projectSchema), addProject);
router
  .route('/:_id')
  .get(getProject)
  .put(validateData(projectSchema), updateProject)
  .delete(deleteProject);

export default router;
