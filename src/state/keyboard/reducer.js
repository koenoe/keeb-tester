// @flow
import * as actions from './actions.js';
import { initialState as initialKeyboardState, createKeycap } from './state.js';
import type { KeyboardState, Keycap, Keycaps, KeycapLegends } from './state.js';
import type { Action } from './actions.js';

function extractLegendsFromKey(key: string): KeycapLegends {
  const legends = key.split('\n');
  return legends.map(legend => {
    return {
      label: legend,
      alignment: 'top-left',
    };
  });
}

function extractKeycapsFromRows(
  rows: $ReadOnlyArray<Array<string | Object>>,
): Keycaps {
  const current = {
    backgroundColor: '',
    color: '',
    fontSize2: 0,
    fontSize: 0,
    ghosted: false,
    height: 0,
    height2: 0,
    homing: false,
    legends: [],
    profile: '',
    rotationAngle: 0,
    rotationX: 0,
    rotationY: 0,
    stepped: false,
    width: 0,
    width2: 0,
    x: 0,
    x2: 0,
    y: 0,
    y2: 0,
  };
  const keycaps = [];
  rows.forEach(row => {
    row.forEach(key => {
      if (typeof key === 'string') {
        const keycap: Keycap = createKeycap({
          ...current,
          legends: extractLegendsFromKey(key),
        });
        keycaps.push(keycap);

        // Set up for the next key
        current.x += current.width;
        current.width = current.height || 1;
        current.x2 = current.y2 || current.width2 || current.height2 || 0;
      } else {
        if (key.f) current.fontSize = key.f;
        if (key.f2) current.fontSize2 = key.f2;
        if (key.p) current.profile = key.p;
        if (key.c) current.backgroundColor = key.c;
        if (key.t) current.color = key.t;
        if (key.x) current.x += key.x;
        if (key.y) current.y += key.y;
        if (key.w) current.width = key.w;
        if (key.h) current.height = key.h;
        if (key.x2) current.x2 = key.x2;
        if (key.y2) current.y2 = key.y2;
        if (key.w2) {
          current.width2 = key.w2;
          current.height2 = current.height;
        }
        if (key.h2) {
          current.height2 = key.h2;
          current.width2 =
            current.width2 === 0 ? current.width : current.width2;
        }
        if (key.l) current.stepped = key.l;
      }
    });
    current.x = 0;
    current.y += 1;
  });
  return keycaps;
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
