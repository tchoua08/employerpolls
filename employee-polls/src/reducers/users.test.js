import users from "./users";
import { RECEIVE_USERS } from "../actions/users";
import { SAVE_QUESTION_ANSWER, ADD_QUESTION } from "../actions/questions";

describe("users reducer", () => {
  it("should return the initial state", () => {
    expect(users(undefined, { type: "@@INIT" })).toEqual({});
  });

  it("should handle RECEIVE_USERS", () => {
    const initial = {};

    const payload = {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "img",
        answers: {},
        questions: [],
      },
      mtsamis: {
        id: "mtsamis",
        name: "Mtsamis",
        avatarURL: "img2",
        answers: { q1: "optionOne" },
        questions: ["q2"],
      },
    };

    const next = users(initial, { type: RECEIVE_USERS, users: payload });

    expect(next).toEqual(payload);
    expect(next).not.toBe(initial);
  });

  it("should handle SAVE_QUESTION_ANSWER by adding answer to authedUser", () => {
    const initial = {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "img",
        answers: { oldQ: "optionTwo" },
        questions: [],
      },
      mtsamis: {
        id: "mtsamis",
        name: "Mtsamis",
        avatarURL: "img2",
        answers: {},
        questions: [],
      },
    };

    const action = {
      type: SAVE_QUESTION_ANSWER,
      authedUser: "sarahedo",
      qid: "newQ",
      answer: "optionOne",
    };

    const next = users(initial, action);

    expect(next.sarahedo.answers.newQ).toBe("optionOne");
    expect(next.sarahedo.answers.oldQ).toBe("optionTwo");

 
    expect(next).not.toBe(initial);
    expect(next.sarahedo).not.toBe(initial.sarahedo);
    expect(next.mtsamis).toBe(initial.mtsamis); 
  });

  it("should handle ADD_QUESTION by pushing question id into author's questions", () => {
    const initial = {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "img",
        answers: {},
        questions: ["q1"],
      },
      mtsamis: {
        id: "mtsamis",
        name: "Mtsamis",
        avatarURL: "img2",
        answers: {},
        questions: [],
      },
    };

    const action = {
      type: ADD_QUESTION,
      question: {
        id: "q2",
        author: "mtsamis",
        timestamp: 123,
        optionOne: { text: "A", votes: [] },
        optionTwo: { text: "B", votes: [] },
      },
    };

    const next = users(initial, action);

    expect(next.mtsamis.questions).toEqual(["q2"]);

    expect(next.sarahedo.questions).toEqual(["q1"]);

    expect(next).not.toBe(initial);
    expect(next.mtsamis).not.toBe(initial.mtsamis);
    expect(next.sarahedo).toBe(initial.sarahedo);
  });

  it("should not mutate state when SAVE_QUESTION_ANSWER dispatched", () => {
    const initial = {
      sarahedo: {
        id: "sarahedo",
        name: "Sarah Edo",
        avatarURL: "img",
        answers: {},
        questions: [],
      },
    };

    const initialAnswersRef = initial.sarahedo.answers;

    const next = users(initial, {
      type: SAVE_QUESTION_ANSWER,
      authedUser: "sarahedo",
      qid: "q100",
      answer: "optionTwo",
    });

    expect(next.sarahedo.answers).not.toBe(initialAnswersRef);
    expect(next.sarahedo.answers.q100).toBe("optionTwo");
  });
});