// @flow
import React from 'react';
import chroma from 'chroma-js';
import classNames from 'classnames';
import { KEYCAP_SIZE } from 'state/keyboard/state.js';

import type { Keycap as KeycapState } from 'state/keyboard/state.js';

import styles from './keycap.css';

type Props = $ReadOnly<{|
  isActive: boolean,
  isPressed: boolean,
|}>;

type CombinedProps = $ReadOnly<{| ...KeycapState, ...Props |}>;

const KEYCAP_MARGINS = [3, 6, 10, 6];

function toPixels(value: number): number {
  return value * KEYCAP_SIZE;
}

function toFontSize(value: number): number {
  return 6 + 2 * value;
}

export default function Keycap(props: CombinedProps) {
  const {
    alignment,
    color,
    fontSize,
    height,
    height2,
    isActive,
    isPressed,
    legends,
    rotationAngle,
    stepped,
    width,
    width2,
    x,
    x2,
    y,
    y2,
  } = props;

  const [marginTop, marginRight, marginBottom, marginLeft] = KEYCAP_MARGINS;
  const activeBackgroundColor = isActive ? '#09801a' : null;
  const pressedBackgroundColor = isPressed ? '#92ed96' : null;
  const backgroundColor =
    activeBackgroundColor ||
    pressedBackgroundColor ||
    // eslint-disable-next-line react/destructuring-assignment
    props.backgroundColor ||
    '#cccccc';
  const backgroundColorLight = chroma(backgroundColor).brighten();
  const keycapInlineBorderColor = chroma(backgroundColor).darken(0.4);

  return (
    <div
      className={styles.container}
      style={{
        height: toPixels(height),
        left: toPixels(x),
        top: toPixels(y),
        width: toPixels(width),
        transform: `rotate(${rotationAngle || 0}deg)`,
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
          backgroundColor: backgroundColorLight,
          borderColor: keycapInlineBorderColor,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
        }}
      />
      {width2 && height2 && !stepped ? (
        <>
          <div
            className={styles.keycap}
            style={{
              backgroundColor: backgroundColorLight,
              borderColor: keycapInlineBorderColor,
              height: toPixels(height2) - marginTop - marginBottom,
              left: toPixels(x2 || 0) + marginLeft,
              top: toPixels(y2 || 0) + marginTop,
              width: toPixels(width2) - marginLeft - marginRight,
            }}
          />
          {/* This is necessary for a proper inline border of odd shaped keys like ISO Enter */}
          <div
            className={styles.keycap}
            style={{
              backgroundColor: backgroundColorLight,
              marginTop: marginTop + 1,
              marginRight: marginRight + 1,
              marginBottom: marginBottom + 1,
              marginLeft: marginLeft + 1,
              border: 0,
            }}
          />
        </>
      ) : null}
      <div
        className={classNames(styles.legends, {
          [styles.centered]: alignment === 'centered',
          [styles['vertical-centered']]: alignment === 'vertical-centered',
          [styles['horizontal-centered']]: alignment === 'horizontal-centered',
          [styles['front-centered']]: alignment === 'front-centered',
        })}
        style={{
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
        }}
      >
        {legends.map(legend => {
          return (
            <span
              key={legend.label}
              className={styles[legend.alignment]}
              dangerouslySetInnerHTML={{ __html: legend.label }}
              style={{
                color: color || '#000000',
                fontSize: legend.alignment.startsWith('front-')
                  ? 10
                  : toFontSize(fontSize || 3),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
