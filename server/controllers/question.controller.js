import Question from '../models/question';
import Answer from '../models/answer';

import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all questions
 * @param req
 * @param res
 * @returns void
 */
export function getQuestions(req, res) {
  Question.find().sort('-dateAdded').exec((err, questions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ questions });
  });
}

/**
 * Save a question
 * @param req
 * @param res
 * @returns void
 */
export function addQuestion(req, res) {
  if (!req.body.question.name || !req.body.question.title || !req.body.question.content) {
    res.status(403).end();
  }

  const newQuestion = new Question(req.body.question);

  // Let's sanitize inputs
  newQuestion.title = sanitizeHtml(newQuestion.title);
  newQuestion.name = sanitizeHtml(newQuestion.name);
  newQuestion.content = sanitizeHtml(newQuestion.content);

  newQuestion.slug = slug(newQuestion.title.toLowerCase(), { lowercase: true });
  newQuestion.cuid = cuid();
  newQuestion.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ question: saved });
  });
}

/**
 * Get a single question
 * @param req
 * @param res
 * @returns void
 */
export function getQuestion(req, res) {
  Question.findOne({ cuid: req.params.cuid }).lean().exec((err, question) => {
    if (err) {
      return  res.status(500).send(err);
    }
    if (question) {
      Answer.find( { 'cuid': {$in: question.answers} }).exec((err, answers) => {
        if (err) {
          return res.status(500).send(err);
        }
        question.answers = answers;
        res.json({question});
      });
    }else{
      res.json({question});
    }
  });
}

/**
 * Delete a question
 * @param req
 * @param res
 * @returns void
 */
export function deleteQuestion(req, res) {
  Question.findOne({ cuid: req.params.cuid }).exec((err, question) => {
    if (err) {
      return res.status(500).send(err);
    }

    question.remove((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      Answer.remove( { 'cuid': {$in: question.answers} }).exec((err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).end();
      });

    });
  });
}
