import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginModal from '../components/LoginModal';

describe('Login modal', () => {
  it('should render Login modal', function () {
    render(<LoginModal />); //{ wrapper: BrowserRouter }
  });

  test('allows user to type into input boxes', async () => {
    render(<LoginModal />); //{ wrapper: BrowserRouter }
    // await render(<Login/>, { wrapper: <BrowserRouter/> })
    const email = 'testemail';
    const password = 'password';
    await userEvent.type(screen.getByPlaceholderText('email'), email);
    await userEvent.type(screen.getByPlaceholderText('password'), password);
    // await userEvent.click(screen.getByRole('button', { name: 'log in' }));
    // await waitForElementToBeRemoved(() => screen.getByRole('button', {name: /log in/i}))
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });
});
