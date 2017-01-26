import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const REFRESH_QUESTION_ANSWERS = 'UPDATE_QUESTION_ANSWERS';
export const ADD_QUESTION_ANSWER = 'UPDATE_QUESTION_ANSWER';

// Export Actions
export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function refreshQuestionAnswers(questionAnswers) {
  return {
    type: REFRESH_QUESTION_ANSWERS,
    questionAnswers
  };
}
export function addQuestionAnswer(questionAnswer) {
  return {
    type: ADD_QUESTION_ANSWER,
    questionAnswer
  };
}
export function addQuestionRequest(question) {
  return (dispatch) => {
    return callApi('questions', 'post', {
      question: {
        name: question.name,
        title: question.title,
        content: question.content,
      },
    }).then(res => {
      dispatch(addQuestion(res.question))
    });
  };
}

export function addQuestions(questions) {
  return {
    type: ADD_QUESTIONS,
    questions,
  };
}
export function fetchQuestions() {
  return (dispatch) => {
    return callApi('questions').then(res => {
        dispatch(addQuestions(res.questions));
    });
  };
}

export function fetchQuestion(cuid) {
  return (dispatch) => {
    return callApi(`questions/${cuid}`).then(res => dispatch(addQuestion(res.question)));
  };
}
export function fetchQuestionData(cuid) {
  return (dispatch) => {
    return callApi(`questions/${cuid}`).then(res => {
      dispatch(refreshQuestionAnswers(res.question.answers,cuid))
    });
  };
}
export function deleteQuestion(cuid) {
  return {
    type: DELETE_QUESTION,
    cuid,
  };
}

export function deleteQuestionRequest(cuid) {
  return (dispatch) => {
    return callApi(`questions/${cuid}`, 'delete').then(() => dispatch(deleteQuestion(cuid)));
  };
}
