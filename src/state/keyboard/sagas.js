// @flow
import { fork, call, all, put } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import * as actions from 'state/keyboard/actions.js';

import type { Saga } from 'redux-saga';

const LOCAL_PRESETS = [
  './presets/ansi-104.json',
  './presets/hhkb-dark.json',
  './presets/hhkb-light.json',
  './presets/iso-105.json',
  './presets/mech27.json',
  './presets/triangle.json',
];

export function* loadPresets(): Saga<void> {
  yield put(actions.loadPresets());
  try {
    const responses = yield all(LOCAL_PRESETS.map(url => call(fetch, url)));
    const presets = yield all(
      responses.map(response => call([response, response.json])),
    );
    yield put(actions.loadPresetsSuccess(presets));
  } catch (error) {
    yield put(actions.loadPresetsFail(error));
  }
}

export default function* rootSaga(): Saga<void> {
  yield fork(loadPresets);
}
