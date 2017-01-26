import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style1
import styles from './AnswerCreateWidget.css';

export class AnswerCreateWidget extends Component {
  addAnswer = () => {
    const nameRef = this.refs.name;
    const questionCuid = this.refs.questionCuid;
    const contentRef = this.refs.content;
    if (nameRef.value && questionCuid.value && contentRef.value) {
      this.props.addAnswer(questionCuid.value, nameRef.value, contentRef.value);
      nameRef.value = contentRef.value = '';
    }
  };

  render() {
    return (
      <div className="">
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="addAnswer" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input type="hidden" value={this.props.question.cuid} ref="questionCuid" />
          <textarea placeholder={this.props.intl.messages.answerContent} className={styles['form-field']} ref="content" />
          <a className={styles['answer-submit-button']} href="#" onClick={this.addAnswer}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

AnswerCreateWidget.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(AnswerCreateWidget);
