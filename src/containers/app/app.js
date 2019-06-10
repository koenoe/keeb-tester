// @flow
import React from 'react';

import Upload from 'containers/upload/upload.js';
import Presets from 'containers/presets/presets.js';
import Keyboard from 'containers/keyboard/keyboard.js';

export default function App() {
  return (
    <>
      <Upload />
      <Presets />
      <Keyboard />
    </>
  );
}
