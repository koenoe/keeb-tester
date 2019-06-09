// @flow
import React from 'react';

import type { Keycap as Props } from 'state/keyboard/state.js';
import styles from './keycap.css';

const KEYCAP_SIZE = 54;

function toPixels(value: number): number {
  return value * KEYCAP_SIZE;
}

// function toFontSize(value: number): number {
//   return value;
// }

export default function Keycap(props: Props) {
  const {
    backgroundColor,
    color,
    // fontSize,
    height,
    legends,
    width,
    x,
    y,
  } = props;

  return (
    <div
      className={styles.keycap}
      style={{
        backgroundColor,
        color,
        // ...(fontSize && { fontSize: toFontSize(fontSize) }),
        height: toPixels(height),
        left: toPixels(x),
        top: toPixels(y),
        width: toPixels(width),
      }}
    >
      {legends.map(legend => (
        <span key={legend.label} className={styles[legend.alignment]}>
          {legend.label}
        </span>
      ))}
    </div>
  );
}
