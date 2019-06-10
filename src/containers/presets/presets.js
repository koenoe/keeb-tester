// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, type OutputSelector } from 'reselect';

import * as keyboardActions from 'state/keyboard/actions.js';
import * as keyboardSelectors from 'state/keyboard/selectors.js';

import type { State } from 'state/state.js';
import type { KeyboardPresets, Keyboard } from 'state/keyboard/state.js';

import styles from './presets.css';

type OutProps = {|
  presets: KeyboardPresets,
|};

type DispatchProps = $ReadOnly<{|
  updateKeyboard: (keyboard: Keyboard) => void,
|}>;

type Props = $ReadOnly<{| ...OutProps, ...DispatchProps |}>;

const mapStateToProps: OutputSelector<
  State,
  any,
  OutProps,
> = createStructuredSelector({
  presets: keyboardSelectors.presets,
});

const mapDispatchToProps = dispatch => {
  return {
    updateKeyboard: (keyboard: Keyboard) =>
      dispatch(keyboardActions.setKeyboard(keyboard)),
  };
};

function Presets(props: Props) {
  const { presets, updateKeyboard } = props;

  const handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();

    updateKeyboard(presets[parseInt(e.target.value, 10)]);
  };

  return (
    <div className={styles.container}>
      <select onChange={handleChange}>
        {presets.map((preset, index) => (
          <option
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            value={index}
          >
            {index}
          </option>
        ))}
      </select>
    </div>
  );
}

export default connect<Props, {||}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(Presets);
