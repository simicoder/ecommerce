import { render, screen, act } from '@testing-library/react';
import { RegisterForm } from './RegisterForm';
import { auth } from 'lib/firebase';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';

describe('email validation', () => {
  const mockedSignUpFunc = jest.spyOn(auth, 'createUserWithEmailAndPassword');
  it('if email field is empty error message should be displayed', async () => {
    render(
      <SnackbarProvider>
        <RegisterForm />
      </SnackbarProvider>,
    );
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(mockedSignUpFunc).not.toHaveBeenCalled();
  });

  it("if email field doesn't contain valid email error message should be displayed", async () => {
    render(
      <SnackbarProvider>
        <RegisterForm />
      </SnackbarProvider>,
    );
    userEvent.type(screen.getByLabelText(/email/i), 'email');
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });
    expect(screen.getByText(/mail must be a valid email/i)).toBeInTheDocument();
    expect(mockedSignUpFunc).not.toHaveBeenCalled();
  });
});

describe('password validation', () => {
  const mockedSignUpFunc = jest.spyOn(auth, 'createUserWithEmailAndPassword');
  it('if password field is empty error message should be displayed', async () => {
    render(
      <SnackbarProvider>
        <RegisterForm />
      </SnackbarProvider>,
    );
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(mockedSignUpFunc).not.toHaveBeenCalled();
  });

  it("if password field doesn't contain valid password error message should be displayed", async () => {
    render(
      <SnackbarProvider>
        <RegisterForm />
      </SnackbarProvider>,
    );
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });
    expect(
      screen.getByText(
        /password must contain an uppercase letter, a special character, a number and must be at least 8 characters long/i,
      ),
    ).toBeInTheDocument();
    expect(mockedSignUpFunc).not.toHaveBeenCalled();
  });
});

test('when email and password are valid callback to sign up should be called', async () => {
  const mockedSignUpFunc = jest.spyOn(auth, 'createUserWithEmailAndPassword');
  render(
    <SnackbarProvider>
      <RegisterForm />
    </SnackbarProvider>,
  );
  userEvent.type(screen.getByLabelText(/email/i), 'email@email.com');
  userEvent.type(screen.getByLabelText(/password/i), 'Te$$t1ng');
  await act(async () => {
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));
  });

  expect(mockedSignUpFunc).toHaveBeenCalled();
  expect(mockedSignUpFunc).toHaveBeenCalledWith('email@email.com', 'Te$$t1ng');
});
