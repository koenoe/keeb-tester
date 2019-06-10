// @flow
import React from 'react';

import Cards from 'components/cards/cards.js';

import Upload from 'containers/upload/upload.js';
import Presets from 'containers/presets/presets.js';
import Keyboard from 'containers/keyboard/keyboard.js';

import type { Node } from 'react';

import './app.css';

export default function App(): Node {
  return (
    <>
      <Cards>
        <Upload />
        <Presets />
      </Cards>
      <Keyboard />
    </>
  );
}
