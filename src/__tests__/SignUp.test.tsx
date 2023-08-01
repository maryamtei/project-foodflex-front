import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Signup from '../components/settings/sign-up/Signup';
import store from '../store';

describe('Sign-Up', () => {
  it('Should render without crash', async () => {
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
  });
});
