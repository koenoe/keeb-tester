// @flow
type Background = $ReadOnly<{|
  name: string,
  style: string,
|}>;

export type Keycaps = Array<Array<string | Object>>;

export type KeyboardState = $ReadOnly<{|
  author?: string,
  background?: Background,
  backgroundColor?: string,
  borderRadius?: string,
  keycaps: Keycaps,
  name?: string,
|}>;

export const initialState: KeyboardState = {
  keycaps: [],
};
