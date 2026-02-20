import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import Leaderboard from "./Leaderboard";

function reducer(state = {}, action) {
  return state;
}

test("leaderboard shows user name and counts", () => {
  const mockState = {
    users: {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "x",
        answers: { q1: "optionOne", q2: "optionTwo" },
        questions: ["q3"],
      },
    },
  };

  const store = createStore(reducer, mockState);

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("Sarah Edo")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument(); // answered
  expect(screen.getByText("1")).toBeInTheDocument(); // created
});