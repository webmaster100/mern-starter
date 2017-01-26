import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './AnswerListItem.css';

function AnswerListItem(props) {
  return (
    <div className={styles['single-answer']}>
      <div className={styles['answer-desc'] + ' mb-5'}>{props.answer.content}</div>
      <div className={styles['author-name']}><FormattedMessage id="answeredBy" />&#58; {props.answer.name}</div>
      <hr className={styles.divider} />
    </div>
  );
}

AnswerListItem.propTypes = {
  answer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired
};

export default AnswerListItem;
