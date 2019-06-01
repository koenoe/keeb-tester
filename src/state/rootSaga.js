// @flow
import { fork, call } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import type { Saga } from 'redux-saga';

import keyboardRootSaga from 'state/keyboard/sagas.js';

export default function* root(): Saga<void> {
  try {
    yield fork(keyboardRootSaga);
  } catch (error) {
    yield call([console, console.error], error);
  }
}
