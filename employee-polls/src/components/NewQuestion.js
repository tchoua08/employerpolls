import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

const NewQuestion = () => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canSubmit = optionOne.trim() !== "" && optionTwo.trim() !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    dispatch(handleAddQuestion(optionOne.trim(), optionTwo.trim()));
    navigate("/");
  };

  return (
    <div className="create-wrap">
      <div className="create-card">
        <h2 className="create-title">Would You Rather</h2>
        <div className="create-subtitle">Create Your Own Poll</div>

        <form className="create-form" onSubmit={onSubmit}>
          <div className="create-label">First Option</div>
          <input
            className="create-input"
            placeholder="Option One"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
          />

          <div className="create-label" style={{ marginTop: 12 }}>
            Second Option
          </div>
          <input
            className="create-input"
            placeholder="Option Two"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
          />

          <button className="create-btn" disabled={!canSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewQuestion;