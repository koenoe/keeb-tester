// @flow
import { put, takeEvery } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import * as actions from 'state/keyboard/actions.js';

import type { Saga } from 'redux-saga';
import type { SetKeyboardFromJsonAction } from 'state/keyboard/actions.js';

export function* setKeyboardFromJson(
  action: SetKeyboardFromJsonAction,
): Saga<void> {
  const json = JSON.parse(action.rawJson);
  const keycaps = json.filter(row => row instanceof Array);
  const firstRow = json.shift();

  yield put(
    actions.setKeyboard({
      ...(firstRow.author && { author: firstRow.author }),
      ...(firstRow.background && { background: firstRow.background }),
      ...(firstRow.backcolor && {
        backgroundColor: firstRow.backcolor,
      }),
      ...(firstRow.radii && { borderRadius: firstRow.radii }),
      ...(firstRow.name && { name: firstRow.name }),
      keycaps,
    }),
  );
}

export default function* rootSaga(): Generator<any, void, any> {
  yield takeEvery(actions.SET_KEYBOARD_FROM_JSON, setKeyboardFromJson);
}
