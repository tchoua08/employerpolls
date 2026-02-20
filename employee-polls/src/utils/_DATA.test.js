import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("returns the saved question and all expected fields when data is formatted correctly", async () => {
    const question = await _saveQuestion({
      optionOneText: "Option One Test",
      optionTwoText: "Option Two Test",
      author: "sarahedo",
    });

    expect(question).toBeDefined();
    expect(question.id).toBeDefined();
    expect(question.timestamp).toBeDefined();
    expect(question.author).toBe("sarahedo");

    expect(question.optionOne).toBeDefined();
    expect(question.optionOne.text).toBe("Option One Test");
    expect(Array.isArray(question.optionOne.votes)).toBe(true);

    expect(question.optionTwo).toBeDefined();
    expect(question.optionTwo.text).toBe("Option Two Test");
    expect(Array.isArray(question.optionTwo.votes)).toBe(true);
  });

  it("returns an error if incorrect data is passed", async () => {
    await expect(
      _saveQuestion({
        optionOneText: "Only one option",
        // optionTwoText missing
        author: "sarahedo",
      })
    ).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });
});

describe("_saveQuestionAnswer", () => {
  it("returns true when correctly formatted data is passed", async () => {
    const result = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd", // id existant dans _DATA.js d'Udacity
      answer: "optionOne",
    });

    expect(result).toBe(true);
  });

  it("returns an error if incorrect data is passed", async () => {
    await expect(
      _saveQuestionAnswer({
        authedUser: "sarahedo",
        qid: "8xf0y6ziyjabvozdd253nd",
        // answer missing
      })
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});