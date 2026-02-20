import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Nav from "./Nav";

// reducer minimal (suffit pour le snapshot)
function reducer(state = {}, action) {
  return state;
}

test("matches snapshot", () => {
  const mockState = {
    authedUser: "sarahedo",
    users: {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "x",
        answers: {},
        questions: [],
      },
    },
  };

  const store = createStore(reducer, mockState);

  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});