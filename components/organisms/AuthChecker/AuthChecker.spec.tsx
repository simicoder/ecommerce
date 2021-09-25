import { screen, render } from "@testing-library/react";
import { AuthChecker } from "./AuthChecker";
import * as userHook from "lib/utils/hooks";
import * as nextRouter from "next/router";
import type { NextRouter } from "next/router";
import firebase from "firebase";

const useRouter = jest.spyOn(nextRouter, "useRouter");

test("when user is not logged in then it should redirect to login page", () => {
  jest.spyOn(userHook, "useUser").mockImplementation(() => ({ user: null }));
  const mockedRedirectFn = jest.fn();
  useRouter.mockImplementationOnce(
    () =>
      ({
        replace: mockedRedirectFn,
      } as unknown as NextRouter)
  );

  render(
    <AuthChecker>
      <button>Logged in!</button>
    </AuthChecker>
  );

  expect(
    screen.queryByRole("button", { name: /logged in/i })
  ).not.toBeInTheDocument();
  expect(mockedRedirectFn).toHaveBeenCalled();
  expect(mockedRedirectFn).toHaveBeenCalledWith("/login");
});

test("when user is logged in then it should render children", () => {
  jest
    .spyOn(userHook, "useUser")
    .mockImplementation(() => ({ user: {} as firebase.User }));
  render(
    <AuthChecker>
      <button>Logged in!</button>
    </AuthChecker>
  );

  expect(
    screen.getByRole("button", { name: /logged in/i })
  ).toBeInTheDocument();
});
