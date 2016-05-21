import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { range, findIndex, every } from 'lodash';
import { createSelector } from 'reselect';
import createReducer from '../createReducer';
// import { API_BASE_URL } from '../../config';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const QUESTIONS_FETCHED = 'QUESTIONS_FETCHED';
export const AGREE = 'AGREE';
export const DISAGREE = 'DISAGREE';
export const PASS = 'PASS';
export const FETCH_RESULTS = 'FETCH_RESULTS';
export const RESULTS_FETCHED = 'RESULTS_FETCHED';

const updateByQuestionId = f => (state, action) => {
  const { questionId } = action;

  if (questionId === undefined) {
    throw new Error('Missing questionId');
  }

  const {
    [questionId]: value,
    ...others
  } = state;

  const newValue = f(value, action);

  if (newValue === undefined) {
    return others;
  }

  return {
    ...others,
    [questionId]: newValue,
  };
};


export const currentQuestionIdxSelector = createSelector(
  ({ questions: { list } }) => list,
  ({ questions: { responses } }) => responses,
  (questions, responses) => findIndex(questions, ({ id }) => responses[id] === undefined),
);

export const isDoneSelector = createSelector(
  ({ questions: { list } }) => list,
  ({ questions: { responses } }) => responses,
  (questions, responses) => every(questions, ({ id }) => responses[id] !== undefined),
);

export const resultsLoadedSelector =
  ({ questions: { results: { data } } }) => data !== null;

const COLORS = ['#5cc2f1', 'rgb(34, 56, 81)', '#e66868'];
const MOCK_QUESTIONS = range(3).map(i =>
  ({
    id: `${i}`,
    text: `${i} La France doit sortir de l'UE`,
    color: COLORS[i % COLORS.length],
  }),
);

export default combineReducers({
  list: createReducer([], {
    [QUESTIONS_FETCHED]: (list, { questions }) => questions,
  }),
  responses: createReducer({}, {
    [AGREE]: updateByQuestionId(() => true),
    [DISAGREE]: updateByQuestionId(() => false),
    [PASS]: updateByQuestionId(() => null),
  }),
  isLoading: createReducer(false, {
    [FETCH_QUESTIONS]: () => true,
    [QUESTIONS_FETCHED]: () => false,
  }),
  results: createReducer({
    loading: false,
    data: null,
  }, {
    [FETCH_RESULTS]: state => ({ ...state, loading: true }),
    [RESULTS_FETCHED]: (state, results) => ({ ...state, loading: false, data: results }),
  }),
});

async function fetchQuestions() {
  return MOCK_QUESTIONS;
}

const fetchQuestionsEpic = action$ =>
  action$.ofType(FETCH_QUESTIONS)
    .mergeMap(() =>
      Observable.fromPromise(fetchQuestions())
        .map(questions => ({ type: QUESTIONS_FETCHED, questions })),
    );

const responseEpic = (action$, store) =>
  Observable.merge(action$.ofType(AGREE), action$.ofType(DISAGREE))
    .mergeMap(() => (
      isDoneSelector(store.getState()) ?
        Observable.of({ type: FETCH_RESULTS }) :
        Observable.of()
    ));

const fetchResultsEpics = action$ =>
  action$.ofType(FETCH_RESULTS)
    .mergeMap(() =>
      Observable.of({ type: RESULTS_FETCHED, results: {} }).delay(1000),
    );

export const epic = combineEpics(
  fetchQuestionsEpic,
  responseEpic,
  fetchResultsEpics,
);
