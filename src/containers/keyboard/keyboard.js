// @flow
import React, { useEffect, useReducer, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, type OutputSelector } from 'reselect';
import * as keyboardSelectors from 'state/keyboard/selectors.js';

import Keycap from 'components/keycap/keycap.js';

import type { Node } from 'react';
import type { State } from 'state/state.js';
import type { Keyboard as KeyboardState } from 'state/keyboard/state.js';

import styles from './keyboard.css';

type OutProps = {|
  keyboard: ?KeyboardState,
|};

type Props = $ReadOnly<{| ...OutProps |}>;

const mapStateToProps: OutputSelector<
  State,
  any,
  OutProps,
> = createStructuredSelector({
  keyboard: keyboardSelectors.activeKeyboard,
});

type ComponentState = {|
  activeKeys: Array<string>,
  pressedKeys: Array<string>,
|};

type Action =
  | {|
      type: 'reset',
    |}
  | {|
      type: 'add-active-key',
      key: string,
    |}
  | {|
      type: 'add-pressed-key',
      key: string,
    |};

const initialState: ComponentState = {
  activeKeys: [],
  pressedKeys: [],
};

function reducer(state: ComponentState, action: Action) {
  switch (action.type) {
    case 'add-active-key': {
      return {
        ...state,
        activeKeys: [...state.activeKeys, action.key],
      };
    }
    case 'add-pressed-key': {
      return {
        ...state,
        activeKeys: [],
        pressedKeys: [...state.pressedKeys, action.key],
      };
    }
    case 'reset': {
      return initialState;
    }
    default:
      throw new Error(`Bad action: ${action.type}`);
  }
}

function Keyboard(props: Props): Node {
  const { keyboard } = props;

  if (!keyboard) {
    return null;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const previousKeyboard = useRef<KeyboardState>(keyboard);
  if (previousKeyboard.current && previousKeyboard.current !== keyboard) {
    dispatch({ type: 'reset' });
    previousKeyboard.current = keyboard;
  }

  const {
    backgroundColor,
    backgroundImage,
    borderRadius,
    height,
    keycaps,
    width,
  } = keyboard;

  const { activeKeys, pressedKeys } = state;

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: 'add-active-key',
      key: e.key,
    });
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('handleKeyUp', e);

    dispatch({
      type: 'add-pressed-key',
      key: e.key,
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div
      className={styles.keyboard}
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
        borderRadius,
        height,
        width,
      }}
    >
      <div className={styles.keycaps}>
        {keycaps.map((keycap, index) => (
          <Keycap
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            isActive={Boolean(
              activeKeys.some(activeKey =>
                keycap.legends.find(
                  legend =>
                    legend.label.toLowerCase() === activeKey.toLowerCase(),
                ),
              ),
            )}
            isPressed={Boolean(
              pressedKeys.some(pressedKey =>
                keycap.legends.find(
                  legend =>
                    legend.label.toLowerCase() === pressedKey.toLowerCase(),
                ),
              ),
            )}
            {...keycap}
          />
        ))}
      </div>
    </div>
  );
}

export default connect<Props, {||}, _, _, _, _>(mapStateToProps)(Keyboard);
