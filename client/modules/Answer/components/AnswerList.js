import React, { PropTypes } from 'react';

// Import Components
import AnswerListItem from './AnswerListItem/AnswerListItem';

function AnswerList(props) {
  var answerFetched = (typeof props.answers[0] == 'string') ? false: true;
  if (!answerFetched) {
    return null;
  }
    return (
    <div className="listView">
      {
        props.answers.map(answer => (
          <AnswerListItem
            answer={answer}
            key={answer.cuid}
          />
        ))
      }
    </div>
  );
}

AnswerList.propTypes = {
  answers: React.PropTypes.array
};

export default AnswerList;
