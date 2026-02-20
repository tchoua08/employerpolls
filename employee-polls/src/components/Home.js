import { useMemo } from "react";
import { useSelector } from "react-redux";
import PollCard from "./PollCard";
import { formatDate } from "../utils/helpers";

const Home = () => {
  const authedUser = useSelector((s) => s.authedUser);
  const users = useSelector((s) => s.users);
  const questions = useSelector((s) => s.questions);

  const answeredIds = useMemo(() => {
    const answers = users?.[authedUser]?.answers || {};
    return new Set(Object.keys(answers));
  }, [users, authedUser]);

  const sorted = useMemo(() => {
    return Object.values(questions || {}).sort((a, b) => b.timestamp - a.timestamp);
  }, [questions]);

  const newQuestions = useMemo(() => {
    return sorted.filter((q) => !answeredIds.has(q.id));
  }, [sorted, answeredIds]);

  const doneQuestions = useMemo(() => {
    return sorted.filter((q) => answeredIds.has(q.id));
  }, [sorted, answeredIds]);

  return (
    <div className="dash-wrap">
      {/* New Questions */}
      <section className="dash-panel">
        <div className="dash-panel-header">New</div>

        <div className="dash-grid">
          {newQuestions.map((q) => (
            <PollCard
              key={q.id}
              questionId={q.id}
              authorName={users?.[q.author]?.id || q.author}
              timeText={formatDate(q.timestamp)}
            />
          ))}
        </div>
      </section>

      {/* Done */}
      <section className="dash-panel">
        <div className="dash-panel-header">Done</div>

        <div className="dash-grid">
          {doneQuestions.map((q) => (
            <PollCard
              key={q.id}
              questionId={q.id}
              authorName={users?.[q.author]?.id || q.author}
              timeText={formatDate(q.timestamp)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;