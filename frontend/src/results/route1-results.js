import "../quizzes/quiz-listing.css";
import ErrorMessage from "../common/error-message";
import LoadingSpinner from "../common/loading-spinner";
import useQuizOnceByName from "../data/hooks/use-quiz-once-by-name";
import QuizListing from "../quizzes/quiz-listing";
import QuizPreview from "../quizzes/quiz-preview";

function Route1Results({ serviceName }) {
  let contents;
  const quizzes = useQuizOnceByName(serviceName);
  // Error handling
  if (quizzes.status === "loading") {
    contents = <LoadingSpinner />;
  }
  if (quizzes.status === "error") {
    contents = (
      <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
    );
  }
  if (quizzes.isEmpty) {
    contents = (
      <>
        <p>
          Here are some relevant resources. Please try to re-phrase your answers
          for more specific results.
        </p>
        <QuizListing />
      </>
    );
  } else {
    // If no errors
    contents = (
      <>
        <ul className="quiz-listing">
          {quizzes.results.map((quiz) => (
            <li key={quiz.id}>
              <QuizPreview id={quiz.id} data={quiz.data} />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return contents;
}

export default Route1Results;
