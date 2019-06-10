// @flow
import { createSelector, type OutputSelector } from 'reselect';

import type { State } from 'state/state.js';
import type {
  Keyboard,
  KeyboardPresets,
  KeyboardState,
  Keycaps,
} from './state.js';

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

export const presets: OutputSelector<
  State,
  any,
  KeyboardPresets,
> = createSelector(
  [keyboardState],
  state => state.presets,
);
