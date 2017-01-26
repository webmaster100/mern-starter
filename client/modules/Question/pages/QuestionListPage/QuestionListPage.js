import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import QuestionList from '../../components/QuestionList';
import QuestionCreateWidget from '../../components/QuestionCreateWidget/QuestionCreateWidget';

// Import Actions
import { addQuestionRequest, fetchQuestions, deleteQuestionRequest } from '../../QuestionActions';
import { toggleAddQuestion } from '../../../App/AppActions';

// Import Selectors
import { getShowAddQuestion } from '../../../App/AppReducer';
import { getQuestions } from '../../QuestionReducer';

class QuestionListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchQuestions());
  }

  handleDeleteQuestion = question => {
    if (confirm('Do you want to delete this question')) { // eslint-disable-line
      this.props.dispatch(deleteQuestionRequest(question));
    }
  };

  handleAddQuestion = (name, title, content) => {
    this.props.dispatch(toggleAddQuestion());
    this.props.dispatch(addQuestionRequest({ name, title, content }));
  };

  render() {
     return (
      <div>
        { this.props.questions.length ? (
            <div>
              <QuestionList handleDeleteQuestion={this.handleDeleteQuestion} questions={this.props.questions} />
            </div>
        ) : (
            <div>
              {'No questions yet'}
            </div>
        )}
        <QuestionCreateWidget addQuestion={this.handleAddQuestion} showAddQuestion={this.props.showAddQuestion} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
QuestionListPage.need = [() => { return fetchQuestions(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddQuestion: getShowAddQuestion(state),
    questions: getQuestions(state),
  };
}

QuestionListPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddQuestion: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

QuestionListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(QuestionListPage);
