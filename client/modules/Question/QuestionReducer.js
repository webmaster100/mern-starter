import { ADD_QUESTION, ADD_QUESTION_ANSWER, REFRESH_QUESTION_ANSWERS, ADD_QUESTIONS, DELETE_QUESTION } from './QuestionActions';
var _ = require('lodash');
// Initial State
const initialState = { data: [] };

const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION :
      return {
        data: [action.question, ...state.data],
      };
    case ADD_QUESTIONS :
          return {
            data: action.questions,
          };
    case REFRESH_QUESTION_ANSWERS :
      var questionIndex = _.findIndex(state.data, {'cuid': action.questionAnswers[0].questionCuid});
      var updatedQuestion = {
        ...state.data[questionIndex],
        answers: action.questionAnswers
      }
      return {
        data: [...state.data.slice(0, questionIndex),
          updatedQuestion,
          ...state.data.slice(questionIndex + 1)]
      }
    case ADD_QUESTION_ANSWER :
      var questionIndex = _.findIndex(state.data, {'cuid': action.questionAnswer.questionCuid});
      var updatedQuestion = {
        ...state.data[questionIndex],
        answers: _.concat(state.data[questionIndex].answers, [action.questionAnswer])
      }
      return {
        data: [...state.data.slice(0, questionIndex),
          updatedQuestion,
          ...state.data.slice(questionIndex + 1)]
      }
    case DELETE_QUESTION :
      return {
        data: state.data.filter(question => question.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all questions
export const getQuestions = state => state.questions.data;

// Get question by cuid
export const getQuestion = (state, cuid) => {
  var foundquestion = state.questions.data.filter(question => question.cuid === cuid)[0];
  return foundquestion;
}

// Export Reducer
export default QuestionReducer;
