// @flow
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, type OutputSelector } from 'reselect';

import * as keyboardActions from 'state/keyboard/actions.js';
import * as keyboardSelectors from 'state/keyboard/selectors.js';

import Card from 'components/card/card.js';

import isDebugMode from 'utils/debug.js';

import type { Node } from 'react';
import type { State } from 'state/state.js';
import type { KeyboardState } from 'state/keyboard/state.js';

type OutProps = {|
  keyboard: KeyboardState,
|};

type DispatchProps = $ReadOnly<{|
  updateKeyboard: (rawJSON: string) => void,
|}>;

type Props = $ReadOnly<{| ...OutProps, ...DispatchProps |}>;

const mapStateToProps: OutputSelector<
  State,
  any,
  OutProps,
> = createStructuredSelector({
  keyboard: keyboardSelectors.keyboardState,
});

const mapDispatchToProps = dispatch => {
  return {
    updateKeyboard: (rawJSON: string) =>
      dispatch(keyboardActions.setKeyboardFromJson(rawJSON)),
  };
};

function useFileReader(): $ReadOnly<{|
  error: ?Error,
  handleChange: (SyntheticInputEvent<HTMLInputElement>) => void,
  value: ?string,
|}> {
  const [value, setValue] = useState<?string>();
  const [error, setError] = useState<?Error>();
  const fileReader: FileReader = new FileReader();

  const handleFileSuccess = () => {
    if (typeof fileReader.result === 'string') {
      setValue(fileReader.result);
    }
  };

  const handleFileError = () => {
    fileReader.abort();
    setError(new Error('Error reading file'));
  };

  const handleChange = useCallback(
    (e: SyntheticInputEvent<HTMLInputElement>) => {
      fileReader.onload = handleFileSuccess;
      fileReader.onerror = handleFileError;
      fileReader.readAsText(e.target.files[0]);
    },
    [],
  );

  return {
    error,
    handleChange,
    value,
  };
}

function Upload(props: Props): Node {
  const { error, value, handleChange } = useFileReader();
  const { updateKeyboard } = props;

  useEffect(() => {
    if (value) updateKeyboard(value);
  }, [value, updateKeyboard]);

  return (
    <Card>
      <input type="file" accept=".json" onChange={handleChange} />
      {error && <p>{error.toString()}</p>}
      {isDebugMode() && value && <pre>{value}</pre>}
    </Card>
  );
}

export default connect<Props, {||}, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);
