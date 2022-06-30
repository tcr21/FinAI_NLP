import { useState } from "react";
import Game from "./game";
import LoadingSpinner from "../common/loading-spinner";
import ErrorMessage from "../common/error-message";

function QuizPage() {
  const [quizFetch, setQuizFetch] = useState({
    isLoading: true,
    errorMessage: "",
    data: null,
  });

  const { isLoading, errorMessage, data } = quizFetch;

  let contents;
  if (quizFetch.isLoading) contents = <LoadingSpinner />;
  else if (quizFetch.errorMessage)
    contents = <ErrorMessage>{errorMessage}</ErrorMessage>;
  else contents = <Game />;

  return <main>{contents}</main>;
}

export default QuizPage;
