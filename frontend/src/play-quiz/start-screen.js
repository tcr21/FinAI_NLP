import ErrorMessage from "../common/error-message";
import "./start-screen.css";

function StartScreen({ quizData, onPlayClick }) {
  let {
    title,
    tags,
    description,
    difficulty,
    ownerName,
    questions,
    // lastModifiedAt,
  } = quizData;

  if (!tags) tags = [];
  if (!title) title = "Untitled Quiz";
  if (!description) description = "No description provided by the author.";
  if (!ownerName) ownerName = "Anonymous";
  if (!questions) questions = [];
  if (!difficulty) difficulty = "Unknown";

  const canPlay = questions.length > 0;
  // const tagString = tags.length > 0 ? `Tagged as: ${tags.join(", ")}` : "";
  // const modifiedString = lastModifiedAt
  //   ? `Last modified on ${lastModifiedAt.toDate().toLocaleDateString()}`
  //   : "";

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
        {!canPlay && (
          <ErrorMessage>
            Cannot play this quiz - it has no questions yet!
          </ErrorMessage>
        )}
        <br></br>
        <br></br>
        <button
          disabled={!canPlay}
          onClick={onPlayClick}
          className=" mt-3 inline-flex items-center bg-indigo-500 border-0 py-1 px-8 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Start playing
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
