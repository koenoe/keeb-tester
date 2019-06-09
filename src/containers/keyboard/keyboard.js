// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, type OutputSelector } from 'reselect';
import * as keyboardSelectors from 'state/keyboard/selectors.js';

import Keycap from 'components/keycap/keycap.js';

import type { State } from 'state/state.js';
import type { Keycaps } from 'state/keyboard/state.js';

import styles from './keyboard.css';

type OutProps = {|
  keycaps: Keycaps,
|};

type Props = $ReadOnly<{| ...OutProps |}>;

const mapStateToProps: OutputSelector<
  State,
  any,
  OutProps,
> = createStructuredSelector({
  keycaps: keyboardSelectors.activeKeyboardKeycaps,
});

function Keyboard(props: Props) {
  const { keycaps } = props;

  if (keycaps.length === 0) {
    return null;
  }

  return (
    <div className={styles.keyboard}>
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
