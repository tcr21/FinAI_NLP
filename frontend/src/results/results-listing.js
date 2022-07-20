import ErrorMessage from "../common/error-message";
import LoadingSpinner from "../common/loading-spinner";
import useQuizOnceByName from "../data/hooks/use-quiz-once-by-name";
import QuizListing from "../quizzes/quiz-listing";
import "../quizzes/quiz-listing.css";
import QuizPreview from "../quizzes/quiz-preview";

function ResultsListing({ route, serviceName }) {
  let contents;

  // TO FIX: needs to be moved to if route 1 but some issue with hook being used at top level
  const quiz = useQuizOnceByName(serviceName);

  if (route === "route1") {
    // Error handling
    if (quiz.status === "loading") {
      contents = <LoadingSpinner />;
    }
    if (quiz.status === "error") {
      contents = (
        <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
      );
    }
    if (
      quiz.docID === null ||
      quiz.docID === undefined ||
      quiz.docData === null ||
      quiz.docData === undefined
    ) {
      contents = (
        <>
          <h2>Sounds like you need to learn more about finance.</h2>
          <p>
            Here are some relevant resources. Please try to re-phrase your
            answers for more specific results.
          </p>
          <QuizListing />
        </>
      );
    } else {
      // If no errors
      contents = (
        <>
          <h2>
            Sounds like you need to learn more about finance. Based on what
            you've told us, we recommend:{" "}
          </h2>
          <ul className="quiz-listing">
            <li key={quiz.docID}>
              <QuizPreview id={quiz.docID} data={quiz.docData} />
            </li>
          </ul>
        </>
      );
    }
  } else if (route === "route2") {
    console.log("serviceName.trim: ", serviceName.trim());
    if (
      serviceName.trim() !== "Budget calculator" &&
      serviceName.trim() !== "Loan calculator"
    ) {
      contents = (
        <>
          <h2>
            Sounds like you need help with managing your personal finances.
          </h2>
          <p>
            Here are some relevant services. Please try to re-phrase your
            answers for more specific results.
          </p>
          <button>Budget calculator</button>
          <button>Loan calculator</button>
        </>
      );
    } else {
      contents = (
        <>
          <h2>
            Sounds like you need help with managing your personal finances.
            Based on what you've told us, we recommend:
          </h2>
          <button>{serviceName}</button>
        </>
      );
    }
  } else if (route === "route3") {
    return (
      <>
        <h2>It sounds like you are at risk.</h2>
        <p>{serviceName}</p>
      </>
    );
  } else {
    return (
      <p>
        Sorry, we haven't found any suggestions for what you wrote. Please try
        to re-phrase your answers.
      </p>
    );
  }

  return <>{contents}</>;
}

export default ResultsListing;
