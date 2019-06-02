// @flow
import React from 'react';

import type { Keycap as Props } from 'state/keyboard/state.js';
import styles from './keycap.css';

// const width = 54;

export default function Keycap(props: Props) {
  console.log(props);
  // const { label, properties } = props;
  // const legends = label.includes('\n')
  //   ? label.split('\n').filter(value => value !== '')
  //   : [label];

  return <div className={styles.keycap}>A</div>;
}
