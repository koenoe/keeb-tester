// @flow
import React from 'react';

import type { Node } from 'react';

import styles from './cards.css';

type Props = $ReadOnly<{|
  children: Node,
|}>;

export default function Cards(props: Props) {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
}
