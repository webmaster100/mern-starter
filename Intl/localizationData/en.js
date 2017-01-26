export default {
  locale: 'en',
  messages: {
    siteTitle: 'MERN Starter Blog',
    addQuestion: 'Add question',
    addAnswer: 'Add answer',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    by: 'Published by',
    answeredBy: 'Answered by',
    deleteQuestion: 'Delete',
    createNewQuestion: 'Create new question',
    deleteAnswer: 'Delete answer',
    authorName: 'Author\'s Name',
    questionTitle: 'Question Title',
    questionContent: 'Question Content',
    answerContent: 'Answer Content',
    submit: 'Submit',
    answers: `{answersCount, number} {answersCount, plural,
                      =0 {answers}
                      one {answer}
                      other {answers}
    }`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,
  },
};
