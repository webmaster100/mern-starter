import Answer from '../models/answer';
import Question from '../models/question';

import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all answers
 * @param req
 * @param res
 * @returns void
 */
export function getAnswers(req, res) {
  Answer.find().sort('-dateAdded').exec((err, answers) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ answers });
  });
}

/**
 * Save a answer
 * @param req
 * @param res
 * @returns void
 */
export function addAnswer(req, res) {
  if (!req.body.answer.name || !req.body.answer.content || !req.body.answer.questionCuid) {
    return res.status(403).end();
  }

  const newAnswer = new Answer(req.body.answer);

  // Let's sanitize inputs
  newAnswer.name = sanitizeHtml(newAnswer.name);
  newAnswer.content = sanitizeHtml(newAnswer.content);

  newAnswer.cuid = cuid();
  Question.findOne({ cuid: req.body.answer.questionCuid }).exec((err, question) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (question) {
      newAnswer.save((err, savedAnswer) => {
        if (err) {
          return res.status(500).send(err);
        }
        question.answers.push(savedAnswer.cuid);
        question.save((err, savedQuestion) => {
          if (err) {
            savedAnswer.remove(() => {
              res.status(500).send(err);
            });
          } else {
            res.json({answer: savedAnswer});
          }
        });
      });
    } else {
      return res.status(500).send('Question not found');
    }
  });
}

/**
 * Get a single answer
 * @param req
 * @param res
 * @returns void
 */
export function getAnswer(req, res) {
  Answer.findOne({ cuid: req.params.cuid }).exec((err, answer) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ answer });
  });
}
/**
 * Get a answers for a Question
 * @param req
 * @param res
 * @returns void
 */
export function getAnswerByQuestionId(req, res) {
  Answer.find({ questionId: req.params.questionId }).exec((err, answers) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ answers });
  });
}

/**
 * Delete a answer
 * @param req
 * @param res
 * @returns void
 */
export function deleteAnswer(req, res) {
  Answer.findOne({ cuid: req.params.cuid }).exec((err, answer) => {
    if (err) {
      res.status(500).send(err);
    }

    answer.remove(() => {
      res.status(200).end();
    });
  });
}