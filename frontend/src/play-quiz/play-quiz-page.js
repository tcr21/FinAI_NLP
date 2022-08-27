import Game from "./game";
import LoadingSpinner from "../common/loading-spinner";
import ErrorMessage from "../common/error-message";
import { useParams } from "react-router";
import useQuizOnce from "../data/hooks/use-quiz-once";
// import useGetTriviaData from "./hooks/use-get-trivia-data";

function PlayQuizPage() {
  const { id } = useParams();

  // Inputs and outputs for hook in order to build rendering logic (output LHS, input RHS)
  // const {status, error, data} = useQuizOnce(id);

  const quiz = useQuizOnce(id);
  // console.log(quiz);

  let contents;
  if (quiz.status === "loading") {
    contents = <LoadingSpinner />;
  } else if (quiz.status === "error") {
    contents = (
      <ErrorMessage>Something went wrong. Please try again. </ErrorMessage>
    );
  } else if (!quiz.exists) {
    contents = <ErrorMessage>No quiz found.</ErrorMessage>;
  } else {
    contents = 
    // Added here for mobile usage in response to user study feedback - TO TEST
    <div className="container px-1 py-10 mx-auto">
      <Game quizData={quiz.data} />
    </div>;
  }

  return <main>{contents}</main>;
}

export default PlayQuizPage;

// If use data that is local/ in code directory (old version:)
// function QuizPage() {
//   const [isLoading, error, quizData] = useGetTriviaData(5, "easy");

//   let contents;
//   if (isLoading) contents = <LoadingSpinner />;
//   else if (error !== "") contents = <ErrorMessage>{error}</ErrorMessage>;
//   else contents = <Game triviaData={quizData} />;

//   return <main>{contents} TO DO</main>;
// }

// export default QuizPage;
