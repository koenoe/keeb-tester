// @flow
export const SET_KEYBOARD = 'keyboard/SET_KEYBOARD';
export const SET_KEYBOARD_FROM_JSON = 'keyboard/SET_KEYBOARD_FROM_JSON';
export const RESET_KEYBOARD = 'keyboard/RESET_KEYBOARD';

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

export type Action = SetKeyboardFromJsonAction | ResetKeyboardAction;
