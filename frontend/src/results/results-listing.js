import ErrorMessage from "../common/error-message";
import LoadingSpinner from "../common/loading-spinner";
import useQuizOnceByName from "../data/hooks/use-quiz-once-by-name";
import "../quizzes/quiz-listing.css";
import QuizPreview from "../quizzes/quiz-preview";

function ResultsListing({ route, serviceName }) {
  let contents;
  const quiz = useQuizOnceByName(serviceName); // TO EDIT: compiler didn't want hook to be conditional but shouldn't load all quizzes every time
  console.log("TEST QUIZ:", quiz);

  // TO FIX (Once sort out null setRecommnededRoute)
  // if (route === "Route 1: Learning") {
  //Create effect that runs when component mounts so we can do our fetching
  // TO FIX ERROR HANDLING
  // if (quiz.status === "loading") {
  //   contents = <LoadingSpinner />;
  // }
  // if (quiz.status === "error") {
  //   contents = (
  //     <ErrorMessage>Something went wrong. Please try again.</ErrorMessage>
  //   );
  // }
  // if (quiz.exists === false) return <p>Quiz not found.</p>;

  contents = (
    <>
      <h2>
        Sounds like you need to learn more about finance. Based on what you've
        told us, we recommend:{" "}
      </h2>
      <ul className="quiz-listing">
        <li key={quiz.docID}>
          <QuizPreview id={quiz.docID} data={quiz.docData} />
        </li>
      </ul>
    </>
  );
  //}
  // else
  if (route === "Route 2: Personal finance") {
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
  } else if (route === null) {
    return <ErrorMessage>No results found for your answer yet.</ErrorMessage>;
  }

  return <>{contents}</>;
}

export default ResultsListing;
