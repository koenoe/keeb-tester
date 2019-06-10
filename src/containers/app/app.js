// @flow
import React from 'react';

import Upload from 'containers/upload/upload.js';
import Presets from 'containers/presets/presets.js';
import Keyboard from 'containers/keyboard/keyboard.js';

import type { Node } from 'react';

import './app.css';

export default function App(): Node {
  return (
    <>
      <Upload />
      <Presets />
      <Keyboard />
    </>
  );
}
