// @flow
import { createSelector, type OutputSelector } from 'reselect';
import type { State } from 'state/state.js';
import type { KeyboardState, Keycaps } from './state.js';

export const keyboardState: State => KeyboardState = state => state.keyboard;

export const keycaps: OutputSelector<State, any, Keycaps> = createSelector(
  [keyboardState],
  keyboard => keyboard.keycaps,
);

export const name: OutputSelector<State, any, ?string> = createSelector(
  [keyboardState],
  keyboard => keyboard.name,
);

export const author: OutputSelector<State, any, ?string> = createSelector(
  [keyboardState],
  keyboard => keyboard.author,
);
