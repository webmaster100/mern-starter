import { ADD_ANSWER, ADD_ANSWERS, DELETE_ANSWER } from './AnswerActions';

// Initial State
const initialState = { data: [] };

const AnswerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANSWER :
      return {
        data: [action.answer, ...state.data],
      };

    case ADD_ANSWERS :
      return {
        data: action.answers,
      };

    case DELETE_ANSWER :
      return {
        data: state.data.filter(answer => answer.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all answers
export const getAnswers = (state, cuid) => state.answers.data;

// Get answer by cuid
export const getAnswer = (state, cuid) => state.answers.data.filter(answer => answer.cuid === cuid)[0];

// Export Reducer
export default AnswerReducer;
