// @flow
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '',
  // forceRefresh: true,
});
export default history;
