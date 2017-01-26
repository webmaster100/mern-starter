import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/AnswerListItem/AnswerListItem.css';

// Import Actions
import { fetchAnswer } from '../../AnswerActions';

// Import Selectors
import { getAnswer } from '../../AnswerReducer';

export function AnswerDetailPage(props) {
  return (
    <div>
      <Helmet title={props.answer.title} />
      <div className={`${styles['single-answer']} ${styles['answer-detail']}`}>
        <h3 className={styles['answer-title']}>{props.answer.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.answer.name}</p>
        <p className={styles['answer-desc']}>{props.answer.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
AnswerDetailPage.need = [params => {
  return fetchAnswer(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    answer: getAnswer(state, props.params.cuid),
  };
}

AnswerDetailPage.propTypes = {
  answer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(AnswerDetailPage);
