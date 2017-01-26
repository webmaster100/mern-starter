import React, { PropTypes,Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/QuestionListItem/QuestionListItem.css';
import AnswerList from '../../../Answer/components/AnswerList';
import AnswerCreateWidget from '../../../Answer/components/AnswerCreateWidget/AnswerCreateWidget';
// Import Actions
import { fetchQuestion, fetchQuestionData} from '../../QuestionActions';
import { addAnswerRequest } from '../../../Answer/AnswerActions';
// Import Selectors
import { getQuestion } from '../../QuestionReducer';


class QuestionDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestionData(this.props.question.cuid));
  }
  handleAddAnswer = (questionCuid, name, content) => {
    this.props.dispatch(addAnswerRequest({ questionCuid, name, content }));
  };

    render() {
      var answersCount = this.props.question.answers.length;
      return (
        <div>
          <Helmet title={this.props.question.title}/>
          <div className={styles['question-detail']}>
            <h3 className={styles['question-title']}>{this.props.question.title}</h3>
            <p className={styles['author-name']}><FormattedMessage  id="by"/> {this.props.question.name}</p>
            <p className={styles['question-desc']}>{this.props.question.content}</p>
          </div>

          <h3 className=""> <FormattedMessage
              id="answers"
              values={{answersCount}}
          /></h3>
          <div className="row">
            <div className={styles['single-question'] + " col-md-10 mx-auto"}>
              <AnswerList answers={this.props.question.answers}/>
              <AnswerCreateWidget question={this.props.question} addAnswer={this.handleAddAnswer}/>
            </div>
          </div>
        </div>
      );
    };
}

// Actions required to provide data for this component to render in sever side.
QuestionDetailPage.need = [params => {
  return fetchQuestion(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    question: getQuestion(state, props.params.cuid),
  };
}

QuestionDetailPage.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    answers: React.PropTypes.array.isRequired
  }).isRequired
};

export default connect(mapStateToProps)(QuestionDetailPage);
