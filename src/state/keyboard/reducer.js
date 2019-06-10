// @flow
import * as actions from './actions.js';
import {
  initialState as initialKeyboardState,
  createKeycap,
  KEYCAP_SIZE,
} from './state.js';
import type {
  Keyboard,
  KeyboardState,
  Keycap,
  KeycapAlignment,
  KeycapLegendAlignment,
  KeycapLegends,
  Keycaps,
} from './state.js';
import type { Action } from './actions.js';

type Rows = $ReadOnlyArray<Array<string | Object>>;

const LEGEND_ALIGNMENTS: $ReadOnlyArray<KeycapLegendAlignment> = [
  'top-left',
  'bottom-left',
  'top-right',
  'bottom-right',
  'front-left',
  'front-right',
  'center-left',
  'center-right',
  'top-center',
  'center',
  'bottom-center',
  'front-center',
];

function extractAlignment(align: number): KeycapAlignment {
  if (align === 6 || align === 2) {
    return 'vertical-centered';
  }
  if (align === 7 || align === 3) {
    return 'centered';
  }
  if (align === 5) {
    return 'horizontal-centered';
  }
  if (align === 4) {
    return 'front-centered';
  }
  return null;
}

function extractLegendsFromKey(key: string): KeycapLegends {
  const legends = key.split('\n');
  return legends
    .map((legend, index) => ({
      label: legend,
      alignment: LEGEND_ALIGNMENTS[index],
    }))
    .filter(legend => Boolean(legend.label));
}

// Heavily inspired by: https://github.com/CQCumbers/kle_render/blob/master/keyboard.py#L93-L172
function extractKeycapsFromRows(rows: Rows): Keycaps {
  const current = {
    alignment: null,
    backgroundColor: '',
    color: '',
    fontSize2: 0,
    fontSize: 0,
    ghosted: false,
    height: 1,
    height2: 0,
    homing: false,
    legends: [],
    profile: '',
    rotationAngle: 0,
    rotationX: 0,
    rotationY: 0,
    stepped: false,
    width: 1,
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
        current.width = 1;
        current.height = 1;
        current.x2 = 0;
        current.y2 = 0;
        current.width2 = 0;
        current.height2 = 0;
      } else {
        // $FlowFixMe
        if (key.a || key.a === 0) current.alignment = extractAlignment(key.a);
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
        if (key.n) current.homing = key.n;
        if (key.r) current.rotationAngle = key.r;
        if (key.rx) {
          current.rotationX = key.rx;
          current.x = 0;
          current.y = 0;
        }
        if (key.ry) {
          current.rotationY = key.ry;
          current.x = 0;
          current.y = 0;
        }
      }
    });
    current.x = 0;
    current.y += 1;
  });
  return keycaps;
}

// Bit hacky, but will do for now.
// Last keycap could have a lower Y value in case of an Ergonomic keyboard
function extractKeyboardHeightFromLastKeycap(keycap: Keycap): number {
  return (keycap.height + keycap.y) * KEYCAP_SIZE;
}

// Bit hacky, but will do for now.
// Row with most keycaps doesn't necessary need to be the longest row.
function extractKeyboardWidthFromRows(rows: Rows): number {
  const longestRow = rows.reduce((a, b) => {
    return a.length > b.length ? a : b;
  });
  let totalWidth = 0;
  let width = 1;
  longestRow.forEach(key => {
    if (typeof key === 'string') {
      totalWidth += width || 1;
      width = 1;
    } else {
      if (key.w) width = key.w;
      if (key.x) width += key.x;
    }
  });
  return totalWidth * KEYCAP_SIZE;
}

function extractKeyboardFromJson(rawJson: string): Keyboard {
  const json = JSON.parse(rawJson);
  const rows = json.filter(row => row instanceof Array);
  const firstRow = json.shift();
  const keycaps: Keycaps = extractKeycapsFromRows(rows);

  return {
    keycaps,
    ...(firstRow.author && { author: firstRow.author }),
    ...(firstRow.background && { background: firstRow.background }),
    backgroundColor: firstRow.backcolor || '#eeeeee',
    borderRadius: firstRow.radii || 6,
    ...(firstRow.name && { name: firstRow.name }),
    height: extractKeyboardHeightFromLastKeycap(keycaps[keycaps.length - 1]),
    width: extractKeyboardWidthFromRows(rows),
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
      const keyboard: Keyboard = extractKeyboardFromJson(action.rawJson);

      return {
        ...state,
        active: keyboard,
      };
    }

    case actions.RESET_KEYBOARD:
      return {
        ...state,
        active: null,
      };

    default:
      return state;
  }
}
