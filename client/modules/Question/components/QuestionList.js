import React, { PropTypes } from 'react';

// Import Components
import QuestionListItem from './QuestionListItem/QuestionListItem';

function QuestionList(props) {
  return (
    <div className="listView">
      {
        props.questions.map(question => (
          <QuestionListItem
            question={question}
            key={question.cuid}
            onDelete={() => props.handleDeleteQuestion(question.cuid)}
          />
        ))
      }
    </div>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired,
};

export default QuestionList;
