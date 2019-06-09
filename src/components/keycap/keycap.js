// @flow
import React from 'react';

import type { Keycap as Props } from 'state/keyboard/state.js';
// import type { Node } from 'react';
import styles from './keycap.css';

const KEYCAP_SIZE = 54;
const KEYCAP_MARGINS = [3, 6, 6, 6];

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
    height2,
    legends,
    width,
    width2,
    x,
    x2,
    y,
    y2,
  } = props;

  const [marginTop, marginRight, marginBottom, marginLeft] = KEYCAP_MARGINS;

  return (
    <div
      className={styles.container}
      style={{
        height: toPixels(height),
        left: toPixels(x),
        top: toPixels(y),
        width: toPixels(width),
      }}
    >
      <div
        className={styles.border}
        style={{
          backgroundColor,
        }}
      />
      {width2 && height2 ? (
        <>
          <div
            className={styles.border}
            style={{
              backgroundColor,
              height: toPixels(height2),
              left: toPixels(x2 || 0),
              top: toPixels(y2 || 0),
              width: toPixels(width2),
            }}
          />
          <div
            className={styles.filler}
            style={{
              backgroundColor,
              marginTop,
              marginRight: 1,
              marginBottom,
              marginLeft: 1,
            }}
          />
        </>
      ) : null}
      <div
        className={styles.keycap}
        style={{
          backgroundColor,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
        }}
      />
      {width2 && height2 ? (
        <div
          className={styles.keycap}
          style={{
            backgroundColor,
            height: toPixels(height2) - marginTop - marginBottom,
            left: toPixels(x2 || 0) + marginLeft,
            top: toPixels(y2 || 0) + marginTop,
            width: toPixels(width2) - marginLeft - marginRight,
          }}
        />
      ) : null}
      <div
        className={styles.legends}
        style={{
          color,
          // ...(fontSize && { fontSize: toFontSize(fontSize) }),
        }}
      >
        {legends.map(legend => (
          <span
            key={legend.label}
            className={styles[legend.alignment]}
            dangerouslySetInnerHTML={{ __html: legend.label }}
          />
        ))}
      </div>
    </div>
  );
}
