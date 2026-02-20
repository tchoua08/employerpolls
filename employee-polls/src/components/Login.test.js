import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

function reducer(state = {}, action) {
  return state;
}

function renderWithProviders(ui) {
  const store = createStore(reducer, {});
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

test("DOM test: submit button enables after typing user and password", () => {
  renderWithProviders(<Login />);

  const userInput = screen.getByPlaceholderText("User");
  const passInput = screen.getByPlaceholderText("Password");
  const submitBtn = screen.getByRole("button", { name: /submit/i });


  expect(submitBtn).toBeDisabled();

  fireEvent.change(userInput, { target: { value: "sarahedo" } });
  fireEvent.change(passInput, { target: { value: "1234" } });

  expect(submitBtn).not.toBeDisabled();
});