import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style1
import styles from './QuestionCreateWidget.css';

export class QuestionCreateWidget extends Component {
  addQuestion = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addQuestion(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddQuestion ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewQuestion" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.questionTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.questionContent} className={styles['form-field']} ref="content" />
          <a className={styles['question-submit-button']} href="#" onClick={this.addQuestion}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

QuestionCreateWidget.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  showAddQuestion: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(QuestionCreateWidget);
