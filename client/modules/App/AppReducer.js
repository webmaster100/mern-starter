// Import Actions
import { TOGGLE_ADD_QUESTION } from './AppActions';

// Initial State
const initialState = {
  showAddQuestion: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_QUESTION:
      return {
        showAddQuestion: !state.showAddQuestion,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddQuestion
export const getShowAddQuestion = state => state.app.showAddQuestion;

// Export Reducer
export default AppReducer;
