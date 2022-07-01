import Game from "./game";
import LoadingSpinner from "../common/loading-spinner";
import ErrorMessage from "../common/error-message";
import useGetTriviaData from "./hooks/use-get-trivia-data";

function QuizPage() {
  const [isLoading, error, quizData] = useGetTriviaData(5, "easy");

  let contents;
  if (isLoading) contents = <LoadingSpinner />;
  else if (error !== "") contents = <ErrorMessage>{error}</ErrorMessage>;
  else contents = <Game triviaData={quizData} />;

  return <main>{contents}</main>;
}

export default QuizPage;
