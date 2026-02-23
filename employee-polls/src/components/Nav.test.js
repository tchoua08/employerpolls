import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./Nav";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockLogout = jest.fn();
jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: "sarahedo",
    isAuthed: true,
    logout: mockLogout,
  }),
}));

function reducer(state = {}, action) {
  return state;
}

function makeStore(preloadedState) {
  return createStore(reducer, preloadedState);
}

beforeEach(() => {
  mockNavigate.mockClear();
  mockLogout.mockClear();
});

test("renders navigation links", () => {
  const store = makeStore({
    users: {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "x",
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Leaderboard")).toBeInTheDocument();
  expect(screen.getByText("New")).toBeInTheDocument();
});

test("shows current user and logout button when authenticated", () => {
  const store = makeStore({
    users: {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "x",
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("Sarah Edo")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
});

test("clicking logout calls logout() and navigates to /login", () => {
  const store = makeStore({
    users: {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "x",
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByRole("button", { name: "Logout" }));

  expect(mockLogout).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
});