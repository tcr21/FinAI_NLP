import ErrorMessage from "../common/error-message";
import LoadingSpinner from "../common/loading-spinner";
import useQuizzesOnce from "../data/hooks/use-quizzes-once";
import "./quiz-listing.css";
import QuizPreview from "./quiz-preview";

function QuizListing() {
  // Create effect that runs when component mounts so we can do our fetching
  const quizzes = useQuizzesOnce();

  if (quizzes.status === "loading") {
    return <LoadingSpinner />;
  }
  if (quizzes.status === "error") {
    return <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>;
  }
  if (quizzes.isEmpty) return <p>No quizzes found.</p>;

  return (
    // <div class="container px-5 py-0 mx-auto">
    <div className="flex flex-wrap -m-4 py-1">
      {quizzes.results.map((quiz) => (
        <QuizPreview id={quiz.id} data={quiz.data} key={quiz.id} />
      ))}
    </div>
    // </div>
  );
}

export default QuizListing;
