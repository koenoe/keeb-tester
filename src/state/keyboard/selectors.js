// @flow
import { createSelector, type OutputSelector } from 'reselect';
import type { State } from 'state/state.js';
import type { KeyboardState, Keycaps, Keyboard } from './state.js';

export const keyboardState: State => KeyboardState = state => state.keyboard;

export const activeKeyboard: OutputSelector<
  State,
  any,
  ?Keyboard,
> = createSelector(
  [keyboardState],
  state => state.active,
);

export const activeKeyboardKeycaps: OutputSelector<
  State,
  any,
  Keycaps,
> = createSelector(
  [activeKeyboard],
  keyboard => (keyboard ? keyboard.keycaps : []),
);

// export const keycaps: OutputSelector<State, any, Keycaps> = createSelector(
//   [keyboardState],
//   keyboard => keyboard.keycaps,
// );

// export const name: OutputSelector<State, any, ?string> = createSelector(
//   [keyboardState],
//   keyboard => keyboard.name,
// );

// export const author: OutputSelector<State, any, ?string> = createSelector(
//   [keyboardState],
//   keyboard => keyboard.author,
// );
