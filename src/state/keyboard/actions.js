// @flow
import type { PayloadRows, Keyboard } from './state.js';

export const SET_KEYBOARD = 'keyboard/SET_KEYBOARD';
export const SET_KEYBOARD_FROM_JSON = 'keyboard/SET_KEYBOARD_FROM_JSON';
export const RESET_KEYBOARD = 'keyboard/RESET_KEYBOARD';
export const LOAD_PRESETS = 'keyboard/LOAD_PRESETS';
export const LOAD_PRESETS_FAIL = 'keyboard/LOAD_PRESETS_FAIL';
export const LOAD_PRESETS_SUCCESS = 'keyboard/LOAD_PRESETS_SUCCESS';

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

export type SetKeyboardAction = {|
  type: 'keyboard/SET_KEYBOARD',
  keyboard: Keyboard,
|};

export function setKeyboard(keyboard: Keyboard): SetKeyboardAction {
  return {
    type: SET_KEYBOARD,
    keyboard,
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

export type LoadPresetsAction = {|
  type: 'keyboard/LOAD_PRESETS',
|};

export function loadPresets(): LoadPresetsAction {
  return {
    type: LOAD_PRESETS,
  };
}

export type LoadPresetsFailAction = {|
  type: 'keyboard/LOAD_PRESETS_FAIL',
  error: Error,
|};

export function loadPresetsFail(error: Error): LoadPresetsFailAction {
  return {
    type: LOAD_PRESETS_FAIL,
    error,
  };
}

export type LoadPresetsSuccessAction = {|
  type: 'keyboard/LOAD_PRESETS_SUCCESS',
  presets: $ReadOnlyArray<PayloadRows>,
|};

export function loadPresetsSuccess(
  presets: $ReadOnlyArray<PayloadRows>,
): LoadPresetsSuccessAction {
  return {
    type: LOAD_PRESETS_SUCCESS,
    presets,
  };
}

export type Action =
  | SetKeyboardAction
  | SetKeyboardFromJsonAction
  | ResetKeyboardAction
  | LoadPresetsAction
  | LoadPresetsFailAction
  | LoadPresetsSuccessAction;
