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

    // doit merger les users dans le state
    expect(next).toEqual(payload);
    // doit être immuable
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

    // new answer ajouté
    expect(next.sarahedo.answers.newQ).toBe("optionOne");
    // ancien answer conservé
    expect(next.sarahedo.answers.oldQ).toBe("optionTwo");

    // immutabilité : objets différents
    expect(next).not.toBe(initial);
    expect(next.sarahedo).not.toBe(initial.sarahedo);
    expect(next.mtsamis).toBe(initial.mtsamis); // user non touché
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

    // doit ajouter l'id à l'auteur
    expect(next.mtsamis.questions).toEqual(["q2"]);

    // les autres users inchangés
    expect(next.sarahedo.questions).toEqual(["q1"]);

    // immutabilité
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

    // nouvelle référence d'answers
    expect(next.sarahedo.answers).not.toBe(initialAnswersRef);
    // valeur correcte
    expect(next.sarahedo.answers.q100).toBe("optionTwo");
  });
});