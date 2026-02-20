import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "./loading";

/* ================= TYPES ================= */

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

/* ================= ACTIONS ================= */

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function saveAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

/* ================= THUNKS ================= */

/**
 * Ajouter une nouvelle question
 */
export function handleAddQuestion(optionOneText, optionTwoText) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authedUser } = getState();

    try {
      const question = await saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser,
      });

      dispatch(addQuestion(question));
    } finally {
      dispatch(hideLoading());
    }
  };
}

/**
 * Sauvegarder une réponse à une question
 */
export function handleSaveQuestionAnswer(qid, answer) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authedUser } = getState();

    try {
      await saveQuestionAnswer({
        authedUser,
        qid,
        answer,
      });

      dispatch(
        saveAnswer({
          authedUser,
          qid,
          answer,
        })
      );
    } finally {
      dispatch(hideLoading());
    }
  };
}