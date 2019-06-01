// @flow
import type { KeyboardState } from './state.js';

export const SET_KEYBOARD = 'keyboard/SET_KEYBOARD';
export const SET_KEYBOARD_FROM_JSON = 'keyboard/SET_KEYBOARD_FROM_JSON';
export const RESET_KEYBOARD = 'keyboard/RESET_KEYBOARD';

export type SetKeyboardPayload = {|
  ...KeyboardState,
|};

export type SetKeyboardAction = {|
  type: 'keyboard/SET_KEYBOARD',
  ...SetKeyboardPayload,
|};

export function setKeyboard({
  author,
  background,
  backgroundColor,
  borderRadius,
  keycaps,
  name,
}: SetKeyboardPayload): SetKeyboardAction {
  return {
    type: SET_KEYBOARD,
    author,
    background,
    backgroundColor,
    borderRadius,
    keycaps,
    name,
  };
}

export type SetKeyboardFromJsonAction = {|
  type: 'keyboard/SET_KEYBOARD_FROM_JSON',
  rawJson: string,
|};

export function setKeyboardFromJson(
  rawJson: string,
): SetKeyboardFromJsonAction {
  return {
    type: SET_KEYBOARD_FROM_JSON,
    rawJson,
  };
}

export type ResetKeyboardAction = {|
  type: 'keyboard/RESET_KEYBOARD',
|};

export function resetKeyboard(): ResetKeyboardAction {
  return {
    type: RESET_KEYBOARD,
  };
}

export type Action =
  | SetKeyboardAction
  | SetKeyboardFromJsonAction
  | ResetKeyboardAction;
