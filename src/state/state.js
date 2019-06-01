// @flow
import type { Router } from 'connected-react-router';

import { initialState as initialKeyboardState } from './keyboard/state.js';
import type { KeyboardState } from './keyboard/state.js';

export type State = {
  router?: Router,
  keyboard: KeyboardState,
};

export const initialState: State = {
  keyboard: initialKeyboardState,
};

export default initialState;
