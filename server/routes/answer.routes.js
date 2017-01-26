import { Router } from 'express';
import * as AnswerController from '../controllers/answer.controller';
const router = new Router();

// Get all Answers
router.route('/answers').get(AnswerController.getAnswers);

// Get one answer by cuid
router.route('/answers/:cuid').get(AnswerController.getAnswer);

// Add a new Answer
router.route('/answers').post(AnswerController.addAnswer);

// Delete a answer by cuid
router.route('/answers/:cuid').delete(AnswerController.deleteAnswer);

export default router;
