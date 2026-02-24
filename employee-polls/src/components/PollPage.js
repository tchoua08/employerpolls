import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { useAuth } from "../context/AuthContext";
const PollPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const { question, author, authedUser, myAnswer } = useSelector((s) => {
    const q = s.questions?.[id] ?? null;
    const au = s.authedUser ?? null;
    const a = q ? s.users?.[q.author] ?? null : null;
    const ans = au ? s.users?.[au]?.answers?.[id] ?? null : null;

    return { question: q, author: a, authedUser: au, myAnswer: ans };
  });
    const { logout } = useAuth();

  if (!question) {
     logout();
    return (
      <Navigate to="/login" 
        replace
       />
    );
  }
  
  const optionOneVotes = question.optionOne?.votes?.length || 0;
  const optionTwoVotes = question.optionTwo?.votes?.length || 0;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const optionOnePct = totalVotes ? Math.round((optionOneVotes / totalVotes) * 100) : 0;
  const optionTwoPct = totalVotes ? Math.round((optionTwoVotes / totalVotes) * 100) : 0;

  const isAnswered = Boolean(myAnswer);
  const onVote = (answer) => {
    if (isAnswered) return; 
    if (!authedUser) return; 

    dispatch(handleSaveQuestionAnswer(id, answer));
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
      {!myAnswer ? (
        <div className="poll-options-row">
          <div className="poll-option-card">
            <div className="poll-option-text">{question.optionOne.text}</div>
            <button className="poll-option-btn" onClick={() => onVote("optionOne")}>
              Click
            </button>
          </div>

          <div className="poll-option-card">
            <div className="poll-option-text">{question.optionTwo.text}</div>
            <button className="poll-option-btn" onClick={() => onVote("optionTwo")}>
              Click
            </button>
          </div>
        </div>
      ) : (
        <div className="results-wrap">
          <div className={myAnswer === "optionOne" ? "result-option selected" : "result-option"}>
            {myAnswer === "optionOne" && <div className="badge">Your Vote</div>}
            <div className="result-text">{question.optionOne.text}</div>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${optionOnePct}%` }} />
            </div>
            <div className="muted">
              {optionOneVotes} out of {totalVotes} votes ({optionOnePct}%)
            </div>
          </div>

          <div className={myAnswer === "optionTwo" ? "result-option selected" : "result-option"}>
            {myAnswer === "optionTwo" && <div className="badge">Your Vote</div>}
            <div className="result-text">{question.optionTwo.text}</div>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${optionTwoPct}%` }} />
            </div>
            <div className="muted">
              {optionTwoVotes} out of {totalVotes} votes ({optionTwoPct}%)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollPage;