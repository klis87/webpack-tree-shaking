import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';

import Layout from 'components/layout';

const renderApp = () => {
  render(<Layout />, document.getElementById('root'));
};

renderApp();

if (module.hot) {
  module.hot.accept('components/layout', renderApp);
}
