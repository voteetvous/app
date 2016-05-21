import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import createReducer from '../createReducer';

export const SET_SESSION_TOKEN = 'SET_SESSION_TOKEN';
export const FETCH_SESSION_TOKEN = 'FETCH_SESSION_TOKEN';

export default createReducer(null, {
  [SET_SESSION_TOKEN]: (_, { token }) => token,
});

export const epic = combineEpics(
  action$ => action$.ofType(SET_SESSION_TOKEN)
    .mergeMap(({ sessionId, token }) => {
      localStorage[`session-token-${sessionId}`] = token;
      return Observable.empty();
    }),
  action$ => action$.ofType(FETCH_SESSION_TOKEN)
    .mergeMap(({ sessionId }) => {
      const token = localStorage[`session-token-${sessionId}`];
      return Observable.of({ type: SET_SESSION_TOKEN, sessionId, token });
    }),
);
