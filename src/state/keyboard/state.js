// @flow
type KeyboardBackground = $ReadOnly<{|
  name: string,
  style: string,
|}>;

type KeycapLegendAlignment =
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

type KeycapLegend = $ReadOnly<{|
  label: string,
  alignment: KeycapLegendAlignment,
|}>;

export type Keycap = $ReadOnly<{|
  backgroundColor: string,
  color: string,
  fontHeight2: number,
  fontHeight: number,
  ghosted: boolean,
  height: number,
  height2?: number,
  homing: boolean,
  legends: $ReadOnlyArray<KeycapLegend>,
  profile: string,
  stepped: boolean,
  width: number,
  width2?: number,
  x: number,
  x2?: number,
  y: number,
  y2?: number,
|}>;

export type Keycaps = $ReadOnlyArray<Keycap>;
export type KeyboardState = $ReadOnly<{|
  author?: string,
  background?: KeyboardBackground,
  backgroundColor?: string,
  borderRadius?: string,
  keycaps: Keycaps,
  name?: string,
|}>;

export const initialState: KeyboardState = {
  keycaps: [],
};
