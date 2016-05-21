import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
// import questions, { epic as questionsEpic } from './questions';
import ui from './ui';
import session, { epic as sessionEpic } from './session';

export const createRootReducer = apolloClient => combineReducers({
  // questions,
  ui,
  session,
  apollo: apolloClient.reducer(),
});

export const rootEpic = combineEpics(
  sessionEpic,
);
