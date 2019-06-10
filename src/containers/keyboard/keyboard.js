// @flow
import React from 'react';
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

function Keyboard(props: Props): Node {
  const { keyboard } = props;

  if (!keyboard) {
    return null;
  }

  const {
    backgroundColor,
    backgroundImage,
    borderRadius,
    height,
    keycaps,
    width,
  } = keyboard;

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
            {...keycap}
          />
        ))}
      </div>
    </div>
  );
}

export default connect<Props, {||}, _, _, _, _>(mapStateToProps)(Keyboard);
