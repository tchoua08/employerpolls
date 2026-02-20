export function formatDate(timestamp) {
  const d = new Date(timestamp);

  // exemple: 4:11PM | 11/23/2021
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    .replace(" ", "")
    .toUpperCase();

  const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  return `${time} | ${date}`;
}

export function formatQuestion (question, author) {
    const { id, timestamp, optionOne, optionTwo } = question;
    return {
        name: author.name,
        avatar: author.avatarURL,
        id,
        timestamp,
        optionOne,
        optionTwo
    }
}   
