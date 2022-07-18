import { Link } from "react-router-dom";
import ErrorMessage from "../common/error-message";
import "./quiz-preview.css";

// Takes quiz ID and data as properties, and formats in card format with title, tags, owner name, description etc. on page

function QuizPreview({ id, data }) {
  // Duplicate error handling with results listing
  if (data === null || data === undefined)
    return <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>;

  let { title, tags, description, ownerName } = data;

  // Defensive coding
  if (!tags) tags = [];
  if (!title) title = "Untitled Quiz";
  if (!description) description = "No description provided.";
  if (!ownerName) ownerName = "Anonymous";

  return (
    <article className="quiz-preview">
      <h3 className="quiz-preview__title">{title}</h3>
      <ul className="quiz-preview__tags">
        {tags.map((tag) => (
          <li className="quiz-preview__tag" key={tag}>
            {tag}
          </li>
        ))}
      </ul>
      <div className="quiz-preview__author">By: {ownerName}</div>
      <p className="quiz-preview__description">{description}</p>
      <Link to={`/play-quiz/${id}`} className="quiz-preview__play">
        <button>Play</button>
      </Link>
    </article>
  );
}

// Note above: if want quizzes/play-quiz then link to 'play-quiz...'
// If want /play-quiz only then link to '/play-quiz...'

export default QuizPreview;
