// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import type { Reducer } from 'redux';
import history from 'utils/history.js';
import type { State, Action } from './state.js';

import keyboardReducer from './keyboard/reducer.js';

export default function createReducer() {
  const rootReducer: Reducer<State, Action> = combineReducers({
    router: connectRouter(history),
    keyboard: keyboardReducer,
  });

  return rootReducer;
}
