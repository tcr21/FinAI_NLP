import QuizListing from "./quiz-listing";

function QuizzesPage() {
  return (
    <main>
      <h1>Choose your quiz</h1>
      {/* <h2>Search</h2>
      <p>TODO: add search bar?</p>
      <h2>Results</h2> */}
      <QuizListing />
    </main>
  );
}

export default QuizzesPage;
