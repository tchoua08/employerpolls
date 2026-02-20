import loadingBar from "./loadingBar";

test("SHOW_LOADING increments", () => {
  expect(loadingBar(0, { type: "SHOW_LOADING" })).toBe(1);
});

test("HIDE_LOADING decrements but not below 0", () => {
  expect(loadingBar(1, { type: "HIDE_LOADING" })).toBe(0);
  expect(loadingBar(0, { type: "HIDE_LOADING" })).toBe(0);
});