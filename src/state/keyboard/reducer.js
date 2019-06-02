// @flow
import * as actions from './actions.js';
import { initialState as initialKeyboardState } from './state.js';
import type { KeyboardState, Keycaps } from './state.js';
import type { Action } from './actions.js';

function extractKeycapsFromRows(
  rows: $ReadOnlyArray<Array<string | Object>>,
): Keycaps {
  console.log(rows);
  return [];
}

function extractKeyboardFromJson(rawJson: string): KeyboardState {
  const json = JSON.parse(rawJson);
  const rows = json.filter(row => row instanceof Array);
  const firstRow = json.shift();
  const keycaps: Keycaps = extractKeycapsFromRows(rows);

  return {
    ...(firstRow.author && { author: firstRow.author }),
    ...(firstRow.background && { background: firstRow.background }),
    ...(firstRow.backcolor && {
      backgroundColor: firstRow.backcolor,
    }),
    ...(firstRow.radii && { borderRadius: firstRow.radii }),
    ...(firstRow.name && { name: firstRow.name }),
    keycaps,
  };
}

export default function keyboardReducer(
  state: KeyboardState = initialKeyboardState,
  action?: Action,
): KeyboardState {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case actions.SET_KEYBOARD_FROM_JSON: {
      const {
        author,
        background,
        backgroundColor,
        borderRadius,
        keycaps,
        name,
      }: KeyboardState = extractKeyboardFromJson(action.rawJson);

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
