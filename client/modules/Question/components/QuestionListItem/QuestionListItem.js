import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './QuestionListItem.css';

function QuestionListItem(props) {
  return (
      <div className="row">
          <div className={styles['single-question'] + " col-md-8 mx-auto"}>
            <h3 className={styles['question-title']}>
              <Link to={`/questions/${props.question.slug}-${props.question.cuid}`} >
                {props.question.title}
              </Link>
            </h3>
            <p className={styles['author-name']}><FormattedMessage id="by" />&#58; {props.question.name}</p>

            <p className={styles['question-desc']}>{props.question.content}</p>
            <button type="button" onClick={props.onDelete} className="btn btn-sm btn-primary"><FormattedMessage id="deleteQuestion" /></button>

             <hr className={styles.divider} />
          </div>
      </div>
  );
}

QuestionListItem.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default QuestionListItem;
