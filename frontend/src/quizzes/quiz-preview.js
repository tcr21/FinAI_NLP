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
    <div className="p-3 lg:w-1/1">
      <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
        {tags.map((tag) => (
          <h2
            className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest"
            key={tag}
          >
            {tag.toUpperCase()}
          </h2>
        ))}
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
          {title}
        </h1>
        <p className="leading-relaxed mb-3">{description}</p>
        <br></br>
        <Link to={`/play-quiz/${id}`} className="quiz-preview__play" target="_blank" rel="noreferrer">
          <button className=" mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-8 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Play
          </button>
        </Link>
      </div>
    </div>
  );
}

// Note above: if want quizzes/play-quiz then link to 'play-quiz...'
// If want /play-quiz only then link to '/play-quiz...'

export default QuizPreview;
