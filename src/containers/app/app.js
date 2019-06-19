// @flow
import React from 'react';

import Input from 'containers/input/input.js';
import Keyboard from 'containers/keyboard/keyboard.js';

import type { Node } from 'react';

import './app.css';

export default function App(): Node {
  return (
    <>
      <Input />
      <Keyboard />
    </>
  );
}
