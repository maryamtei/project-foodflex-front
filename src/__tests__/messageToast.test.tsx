import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Message from '../components/Message/Message';

const mockStore = configureMockStore();

describe('Information message toast', () => {
  it('Should render without crash', async () => {
    // Set up the mock store with message and status
    const message = 'ok';
    const status = 200;
    const store = mockStore({
      settings: { message, status },
    });

    // Render the Message component with the mock store
    render(
      <Provider store={store}>
        <Message />
      </Provider>
    );
  });

  it('should render the error message RED when status is not 200', () => {
    // Set up the mock store with error message and status
    const message = 'Error Message';
    const status = 400;
    const store = mockStore({
      settings: { message, status },
    });

    // Render the Message component with the mock store
    render(
      <Provider store={store}>
        <Message />
      </Provider>
    );

    // Check that the message is rendered
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();

    // Get the alert element by its role
    const alertMessage = screen.getByRole('alert');

    // Check that the correct CSS class is applied based on the status (Color Red)
    const errorClassName =
      'bg-orange-100 border-l-4 border-red-600 text-red-600';
    expect(alertMessage).toHaveClass(errorClassName);
  });

  it('should render the error message GREEN when status is 200', () => {
    // Set up the mock store with success message and status
    const message = 'Add Favorite';
    const status = 200;
    const store = mockStore({
      settings: { message, status },
    });

    // Render the Message component with the mock store
    render(
      <Provider store={store}>
        <Message />
      </Provider>
    );

    // Check that the message is rendered
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();

    // Get the alert element by its role
    const alertMessage = screen.getByRole('alert');

    // Check that the correct CSS class is applied based on the status (Color Green)
    const errorClassName =
      'bg-orange-100 border-l-4 border-green-500 text-green-500';
    expect(alertMessage).toHaveClass(errorClassName);
  });
});
