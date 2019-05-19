// @flow
// Needed for redux-saga es6 generator support
import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';

render(<div>koen</div>, (document.getElementById('root'): any));

// if (module.hot) {
//   module.hot.accept('components/Root', (): void => {
//     const NewRoot: any = require('components/Root').default; // eslint-disable-line global-require
//     render(
//       <AppContainer>
//         <NewRoot store={store} history={history} />
//       </AppContainer>,
//       (document.getElementById('root'): any),
//     );
//   });
// }
