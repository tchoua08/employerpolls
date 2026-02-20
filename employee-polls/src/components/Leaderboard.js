import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function Leaderboard() {
  const users = useSelector((s) => s.users);

  const ranked = useMemo(() => {
    const list = Object.values(users || {});
    return list
      .map((u) => {
        const answered = Object.keys(u.answers || {}).length;
        const asked = (u.questions || []).length;
        return { ...u, answered, asked, score: answered + asked };
      })
      .sort((a, b) => b.score - a.score);
  }, [users]);

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((u) => (
            <tr key={u.id}>
              <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img className="avatar-sm" src={u.avatarURL} alt={u.name} />
                {u.name}
              </td>
              <td>{u.answered}</td>
              <td>{u.asked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
