import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/questions";

const PollPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const authedUser = useSelector((s) => s.authedUser);
  const question = useSelector((s) => s.questions?.[id]);
  const author = useSelector((s) => (question ? s.users?.[question.author] : null));

  const myAnswer = useSelector((s) => s.users?.[authedUser]?.answers?.[id] || null);

  // ✅ Après login, si la question n’existe pas → 404
  if (!question) {
    return <Navigate to="/404" replace />;
  }

  const totalVotes =
    (question.optionOne.votes?.length || 0) + (question.optionTwo.votes?.length || 0);

  const compute = (votes) => {
    const count = votes.length;
    const pct = totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);
    return { count, pct };
  };

  const opt1 = useMemo(() => compute(question.optionOne.votes || []), [question, totalVotes]);
  const opt2 = useMemo(() => compute(question.optionTwo.votes || []), [question, totalVotes]);

  const vote = (answerKey) => {
    if (myAnswer) return; // ✅ pas de 2ème vote
    dispatch(handleSaveQuestionAnswer(id, answerKey));
  };

  return (
    <div className="poll-wrap">
      <h2 className="poll-title">Poll by {author?.id || question.author}</h2>

      <div className="poll-avatar-wrap">
        <img
          className="poll-avatar-lg"
          src={author?.avatarURL}
          alt={author?.name || "author"}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/170?text=User";
          }}
        />
      </div>

      <h3 className="poll-wyr">Would You Rather</h3>

      {/* ✅ Si pas répondu : vue vote (capture Udacity) */}
      {!myAnswer ? (
        <div className="poll-options-row">
          <div className="poll-option-card">
            <div className="poll-option-text">{question.optionOne.text}</div>
            <button className="poll-option-btn" onClick={() => vote("optionOne")}>
              Click
            </button>
          </div>

          <div className="poll-option-card">
            <div className="poll-option-text">{question.optionTwo.text}</div>
            <button className="poll-option-btn" onClick={() => vote("optionTwo")}>
              Click
            </button>
          </div>
        </div>
      ) : (
        /* ✅ Si répondu : vue résultats (votes + % + badge choix) */
        <div className="results-wrap">
          <div className={myAnswer === "optionOne" ? "result-option selected" : "result-option"}>
            {myAnswer === "optionOne" && <div className="badge">Your Vote</div>}
            <div className="result-text">{question.optionOne.text}</div>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${opt1.pct}%` }} />
            </div>
            <div className="muted">
              {opt1.count} out of {totalVotes} votes ({opt1.pct}%)
            </div>
          </div>

          <div className={myAnswer === "optionTwo" ? "result-option selected" : "result-option"}>
            {myAnswer === "optionTwo" && <div className="badge">Your Vote</div>}
            <div className="result-text">{question.optionTwo.text}</div>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${opt2.pct}%` }} />
            </div>
            <div className="muted">
              {opt2.count} out of {totalVotes} votes ({opt2.pct}%)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollPage;