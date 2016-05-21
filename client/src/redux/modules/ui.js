import { combineReducers } from 'redux';
import createReducer from '../createReducer';

export const SHOW_ABOUT = 'SHOW_ABOUT';
export const HIDE_ABOUT = 'HIDE_ABOUT';

export default combineReducers({
  showAbout: createReducer(false, {
    [SHOW_ABOUT]: () => true,
    [HIDE_ABOUT]: () => false,
  }),
});
