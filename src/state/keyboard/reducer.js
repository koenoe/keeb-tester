// @flow
import * as actions from './actions.js';
import { initialState as initialKeyboardState } from './state.js';
import type { KeyboardState } from './state.js';
import type { Action } from './actions.js';

export default function keyboardReducer(
  state: KeyboardState = initialKeyboardState,
  action?: Action,
): KeyboardState {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case actions.SET_KEYBOARD: {
      const {
        author,
        background,
        backgroundColor,
        borderRadius,
        keycaps,
        name,
      } = action;
      return {
        ...state,
        author,
        background,
        backgroundColor,
        borderRadius,
        keycaps,
        name,
      };
    }
    case actions.RESET_KEYBOARD:
      return initialKeyboardState;
    default:
      return state;
  }
}
