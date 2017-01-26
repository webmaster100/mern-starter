import callApi from '../../util/apiCaller';
import { addQuestionAnswer } from '../Question/QuestionActions';

// Export Constants
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_ANSWERS = 'ADD_ANSWERS';
export const DELETE_ANSWER = 'DELETE_ANSWER';


export function addAnswerRequest(answer) {
  return (dispatch) => {
    return callApi('answers', 'post', {
      answer: {
        name: answer.name,
        questionCuid: answer.questionCuid,
        content: answer.content,
      },
    }).then(res => {
      dispatch(addQuestionAnswer(res.answer));
    });
  };
}

export function addAnswers(answers) {
  return {
    type: ADD_ANSWERS,
    answers,
  };
}

export function fetchAnswers() {
  return (dispatch) => {
    return callApi('answers').then(res => {
      dispatch(addAnswers(res.answers));
    });
  };
}

export function fetchAnswer(cuid) {
  return (dispatch) => {
    return callApi(`answers/${cuid}`).then(res => dispatch(addAnswer(res.answer)));
  };
}

export function deleteAnswer(cuid) {
  return {
    type: DELETE_ANSWER,
    cuid,
  };
}

export function deleteAnswerRequest(cuid) {
  return (dispatch) => {
    return callApi(`answers/${cuid}`, 'delete').then(() => dispatch(deleteAnswer(cuid)));
  };
}
