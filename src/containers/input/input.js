// @flow
import React from 'react';

import Cards from 'components/cards/cards.js';
import Card from 'components/card/card.js';

import Upload from 'containers/upload/upload.js';
import Presets from 'containers/presets/presets.js';

import type { Node } from 'react';

export default function Input(): Node {
  return (
    <Cards>
      <Card>
        <Upload />
        <Presets />
      </Card>
    </Cards>
  );
}
