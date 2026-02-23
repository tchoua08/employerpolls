import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Login from "./Login";

// reducer minimal
function reducer(state = {}, action) {
  return state;
}

test("Login component matches snapshot", () => {
  const store = createStore(reducer, {});

  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});