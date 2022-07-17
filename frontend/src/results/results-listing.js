import ErrorMessage from "../common/error-message";
import LoadingSpinner from "../common/loading-spinner";
import useQuizOnceByName from "../data/hooks/use-quiz-once-by-name";
import "../quizzes/quiz-listing.css";
import QuizPreview from "../quizzes/quiz-preview";

function ResultsListing({ route, serviceName }) {
  let contents;
  const quiz = useQuizOnceByName(serviceName);

  if (route === "Route 1: Learning") {
    //Create effect that runs when component mounts so we can do our fetching
    if (quiz.status === "loading") {
      contents = <LoadingSpinner />;
    }
    if (quiz.status === "error") {
      contents = (
        <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
      );
    }
    if ((quiz.exists = false)) return <p>Quiz no longer exists.</p>;

    contents = (
      <>
        <h2>
          Sounds like you need to learn more about finance. Based on what you've
          told us, we recommend:{" "}
        </h2>
        <ul className="quiz-listing">
          <li key={quiz.id}>
            <QuizPreview id={quiz.id} data={quiz.data} />
          </li>
        </ul>
      </>
    );
  } else if (route === "Route 2: Personal finance") {
    contents = (
      <>
        <h2>
          Sounds like you need help with managing your personal finances. Based
          on what you've told us, we recommend:
        </h2>
        <button>{serviceName}</button>
      </>
    );
  } else if (route === "Route 3: Emergency") {
    return (
      <h2>
        It sounds like you are at risk. Please contact emergency services.
      </h2>
    );
  } else {
    return <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>;
  }

  return <>{contents}</>;
}

export default ResultsListing;
