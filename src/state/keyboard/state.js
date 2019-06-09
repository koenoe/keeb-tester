// @flow
type KeyboardBackground = $ReadOnly<{|
  name: string,
  style: string,
|}>;

/*
  If a keycap has multiple legends, each legend is separated by a newline character \n. The order of legend positions is as follows:
  ---------------
  "top left\n
  bottom left\n
  top right\n
  bottom right\n
  front left\n
  front right\n
  center left\n
  center right\n
  top center\n
  center\n
  bottom center\n
  front center"
  ----------------
  The string of the keycap is cut off at the last non-empty legend. For example, a keycap that is labeled 'Q' at the top left and '1' at the top right is encoded by the string "Q\n\n1".
*/
export type KeycapLegendAlignment =
  | 'top-left'
  | 'bottom-left'
  | 'top-right'
  | 'bottom-right'
  | 'front-left'
  | 'front-right'
  | 'center-left'
  | 'center-right'
  | 'top-center'
  | 'center'
  | 'bottom-center'
  | 'front-center';

export type KeycapLegend = $ReadOnly<{|
  label: string,
  alignment: KeycapLegendAlignment,
|}>;

export type KeycapLegends = $ReadOnlyArray<KeycapLegend>;

export type KeycapAlignment =
  | 'centered'
  | 'vertical-centered'
  | 'horizontal-centered'
  | 'front-centered'
  | null;

export type Keycap = $ReadOnly<{|
  alignment: KeycapAlignment,
  backgroundColor: string,
  color: string,
  fontSize2: number,
  fontSize: number,
  ghosted: boolean,
  height: number,
  height2?: number,
  homing: boolean,
  legends: KeycapLegends,
  profile: string,
  rotationAngle?: number,
  rotationX?: number,
  rotationY?: number,
  stepped: boolean,
  width: number,
  width2?: number,
  x: number,
  x2?: number,
  y: number,
  y2?: number,
|}>;

export function createKeycap(additions?: $Shape<Keycap>): Keycap {
  const required = {
    alignment: null,
    backgroundColor: '',
    color: '',
    fontSize2: 0,
    fontSize: 0,
    ghosted: false,
    height: 0,
    homing: false,
    legends: [],
    profile: '',
    stepped: false,
    width: 0,
    x: 0,
    y: 0,
  };

  return {
    ...required,
    ...(additions !== undefined ? additions : {}),
  };
}

export type Keycaps = $ReadOnlyArray<Keycap>;
export type Keyboard = $ReadOnly<{|
  author?: string,
  background?: KeyboardBackground,
  backgroundColor: string,
  borderRadius: string,
  keycaps: Keycaps,
  name?: string,
  height: number,
  width: number,
|}>;

export type KeyboardState = $ReadOnly<{|
  active: ?Keyboard,
  presets: $ReadOnlyArray<Keyboard>,
|}>;

export const initialState: KeyboardState = {
  active: null,
  presets: [],
};

export const KEYCAP_SIZE = 54; // Keycap size in pixels
