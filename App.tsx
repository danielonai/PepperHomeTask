import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/routes/mainNavigator';
import store from './src/redux/store';

export default function App() {
  return (
    <>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </>
  );
}

