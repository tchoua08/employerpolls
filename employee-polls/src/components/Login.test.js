import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { from: "/leaderboard" } }),
  };
});

const mockLogin = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

jest.mock("../assets/logo.png", () => "logo.png");

function reducer(state = {}, action) {
  return state;
}

function makeStore(preloadedState) {
  return createStore(reducer, preloadedState);
}

beforeEach(() => {
  mockLogin.mockClear();
  mockNavigate.mockClear();
});

test("renders login form correctly", () => {
  const store = makeStore({
    users: {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        password: "1234",
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("Employee Polls")).toBeInTheDocument();
  expect(screen.getByText("Log In")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
});

test("shows error for incorrect password", () => {
  const store = makeStore({
    users: {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        password: "correct",
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "sarahedo" },
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "wrong" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Submit" }));

  expect(screen.getByText("Incorrect password.")).toBeInTheDocument();
  expect(mockLogin).not.toHaveBeenCalled();
});

test("logs in successfully with correct credentials", () => {
  const store = makeStore({
    users: {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        password: "1234",
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "sarahedo" },
  });

  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "1234" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Submit" }));

  expect(mockLogin).toHaveBeenCalledWith("sarahedo");
  expect(mockNavigate).toHaveBeenCalledWith("/leaderboard", {
    replace: true,
  });
});