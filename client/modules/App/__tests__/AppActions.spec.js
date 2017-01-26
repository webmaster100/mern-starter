import test from 'ava';
import { actionTest } from 'redux-ava';
import { TOGGLE_ADD_QUESTION, toggleAddQuestion } from '../AppActions';

test('should return the correct type for toggleAddQuestion', actionTest(toggleAddQuestion, null, { type: TOGGLE_ADD_QUESTION }));
