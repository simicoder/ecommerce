import { render, screen, act } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { auth } from 'lib/firebase';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';

describe('email validation', () => {
  const mockedLogInFunc = jest.spyOn(auth, 'signInWithEmailAndPassword');
  it('if email field is empty error message should be displayed', async () => {
    render(
      <SnackbarProvider>
        <LoginForm />
      </SnackbarProvider>,
    );

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    });

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(mockedLogInFunc).not.toHaveBeenCalled();
  });

  it("if email field doesn't contain valid email error message should be displayed", async () => {
    render(
      <SnackbarProvider>
        <LoginForm />
      </SnackbarProvider>,
    );

    userEvent.type(screen.getByLabelText(/email/i), 'email');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    });

    expect(screen.getByText(/mail must be a valid email/i)).toBeInTheDocument();
    expect(mockedLogInFunc).not.toHaveBeenCalled();
  });
});

describe('password validation', () => {
  const mockedLogInFunc = jest.spyOn(auth, 'signInWithEmailAndPassword');
  it('if password field is empty error message should be displayed', async () => {
    render(
      <SnackbarProvider>
        <LoginForm />
      </SnackbarProvider>,
    );

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    });

    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(mockedLogInFunc).not.toHaveBeenCalled();
  });

  it("if password field doesn't contain valid password error message should be displayed", async () => {
    render(
      <SnackbarProvider>
        <LoginForm />
      </SnackbarProvider>,
    );

    userEvent.type(screen.getByLabelText(/password/i), 'password');

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    });

    expect(
      screen.getByText(
        /password must contain an uppercase letter, a special character, a number and must be at least 8 characters long/i,
      ),
    ).toBeInTheDocument();

    expect(mockedLogInFunc).not.toHaveBeenCalled();
  });
});

test('when email and password are valid callback to log in should be called', async () => {
  const mockedLogInFunc = jest.spyOn(auth, 'signInWithEmailAndPassword');

  render(
    <SnackbarProvider>
      <LoginForm />
    </SnackbarProvider>,
  );

  userEvent.type(screen.getByLabelText(/email/i), 'email@email.com');

  userEvent.type(screen.getByLabelText(/password/i), 'ZAQ!2wsx');
  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /sign in/i }));
  });

  expect(mockedLogInFunc).toHaveBeenCalled();
  expect(mockedLogInFunc).toHaveBeenCalledWith('email@email.com', 'ZAQ!2wsx');
});
