import { Link } from "react-router-dom";

const PollCard = ({ questionId, authorName, timeText }) => {
  return (
    <div className="poll-mini">
      <div className="poll-mini-user">{authorName}</div>
      <div className="poll-mini-time">{timeText}</div>

      <Link className="poll-mini-btn" to={`/questions/${questionId}`}>
        Show
      </Link>
    </div>
  );
};

export default PollCard;