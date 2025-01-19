import { Router } from 'express';
import {
  addComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from '../controllers/comment.controller';
import authRequired from '../middlewares/authRequired.middleware';

const router = Router();

router.use(authRequired);

router.route('/:projectId').get(getComments).post(addComment);

router.route('/:_id').get(getComment).put(updateComment).delete(deleteComment);

export default router;
