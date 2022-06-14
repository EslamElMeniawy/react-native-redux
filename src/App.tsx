import React from 'react';
import {Provider} from 'react-redux';

import {store} from './store';

import NavigationContainer from './navigation/NavigationContainer';

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};
