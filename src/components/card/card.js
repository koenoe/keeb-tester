// @flow
import React from 'react';

import type { Node } from 'react';

import styles from './card.css';

type Props = $ReadOnly<{|
  children: Node,
|}>;

export default function Keycap(props: Props) {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
}
