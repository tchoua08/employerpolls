import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PollCard from "./PollCard";
import { formatDate } from "../utils/helpers";

export default function Home() {
  const [tab, setTab] = useState("unanswered"); 

  const authedUser = useSelector((s) => s.authedUser);
  const users = useSelector((s) => s.users || {});
  const questions = useSelector((s) => s.questions || {});

  const answeredIds = useMemo(() => {
    const answers = users?.[authedUser]?.answers || {};
    return new Set(Object.keys(answers));
  }, [users, authedUser]);

  const sortedQuestions = useMemo(() => {
    return Object.values(questions).sort((a, b) => b.timestamp - a.timestamp);
  }, [questions]);

  const unanswered = useMemo(() => {
    return sortedQuestions.filter((q) => !answeredIds.has(q.id));
  }, [sortedQuestions, answeredIds]);

  const answered = useMemo(() => {
    return sortedQuestions.filter((q) => answeredIds.has(q.id));
  }, [sortedQuestions, answeredIds]);

  const list = tab === "unanswered" ? unanswered : answered;

  return (
    <div className="dash-wrap">
      <div className="dash-toggle">
        <button
          className={tab === "unanswered" ? "dash-tab active" : "dash-tab"}
          onClick={() => setTab("unanswered")}
        >
          Unanswered Questions
        </button>

        <button
          className={tab === "answered" ? "dash-tab active" : "dash-tab"}
          onClick={() => setTab("answered")}
        >
          Answered Questions
        </button>
      </div>

      <section className="dash-panel">
        <div className="dash-panel-header">
          {tab === "unanswered" ? "New Questions" : "Done"}
        </div>

        <div className="dash-grid">
          {list.map((q) => (
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
}