import questions from "./questions";
import { ADD_QUESTION } from "../actions/questions";

test("ADD_QUESTION adds question into state", () => {
  const q = {
    id: "abc",
    author: "sarahedo",
    timestamp: 1,
    optionOne: { text: "A", votes: [] },
    optionTwo: { text: "B", votes: [] },
  };

  const state = questions({}, { type: ADD_QUESTION, question: q });
  expect(state.abc).toBeDefined();
  expect(state.abc.id).toBe("abc");
});