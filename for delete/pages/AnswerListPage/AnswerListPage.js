import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import AnswerList from '../../components/AnswerList';
import AnswerCreateWidget from '../../components/AnswerCreateWidget/AnswerCreateWidget';

// Import Actions
import { addAnswerRequest, fetchAnswers, deleteAnswerRequest } from '../../AnswerActions';
import { toggleAddAnswer } from '../../../App/AppActions';

// Import Selectors
import { getAnswers } from '../../AnswerReducer';

class AnswerListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAnswers());
  }

  handleDeleteAnswer = answer => {
    if (confirm('Do you want to delete this answer')) { // eslint-disable-line
      this.props.dispatch(deleteAnswerRequest(answer));
    }
  };

  handleAddAnswer = (questionCuid, name, content) => {
    this.props.dispatch(toggleAddAnswer());
    this.props.dispatch(addAnswerRequest({ questionCuid, name, content }));
  };

  render() {
    return (
      <div>
        <AnswerList handleDeleteAnswer={this.handleDeleteAnswer} answers={this.props.answers} />
        <AnswerCreateWidget addAnswer={this.handleAddAnswer} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
AnswerListPage.need = [() => { return fetchAnswers(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    answers: getAnswers(state),
  };
}

AnswerListPage.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

AnswerListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(AnswerListPage);
