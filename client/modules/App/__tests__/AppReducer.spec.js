import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowAddQuestion } from '../AppReducer';
import { toggleAddQuestion } from '../AppActions';

test('action for TOGGLE_ADD_QUESTION is working', reducerTest(
  appReducer,
  { showAddQuestion: false },
  toggleAddQuestion(),
  { showAddQuestion: true },
));

test('getShowAddQuestion selector', t => {
  t.is(getShowAddQuestion({
    app: { showAddQuestion: false },
  }), false);
});
