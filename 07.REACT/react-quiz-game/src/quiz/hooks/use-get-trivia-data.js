import { useEffect, useState } from "react";
import he from "he";

// Utility function to decode HTML elements
function decodeTriviaData(results) {
  const decodedResults = results.map((item) => {
    return {
      ...item,
      question: he.decode(item.question),
      correct_answer: he.decode(item.correct_answer),
      incorrect_answers: item.incorrect_answers.map((incorrect) =>
        he.decode(incorrect)
      ),
    };
  });
  return decodedResults;
}

// Utility function: asynchronous function that fetches JSON from URL
async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Something went wrong, server responded with ${response.status}.`
    );
  }

  const json = await response.json();
  return json; // asynchronous function so returns a promise
}

// Custom hook 1 (uses React state hook and effect hook)
function useGetTriviaData(amount = 10, difficulty = "") {
  const [quizFetch, setQuizFetch] = useState({
    isLoading: true,
    errorMessage: "",
    data: null,
  });

  // Second argument for dependencies: empty array means effect (fetch) only runs on mount (eg when switch from one page to another/ when reload page)
  useEffect(() => {
    async function getQuiz() {
      try {
        const params = new URLSearchParams({ amount, type: "multiple" });
        if (difficulty !== "") params.append("difficulty", difficulty);
        const url = `https://opentdb.com/api.php?${params.toString()}`;

        const json = await fetchJson(url); // have to await since fetchJson is asynchronous
        const { response_code, results } = json;

        if (response_code === 1) {
          throw new Error("Bad API request - no results!");
        } else if (response_code === 2) {
          throw new Error("Bad API request - invalid parameter!");
        }

        // Have passed all error checks
        setQuizFetch({
          isLoading: false,
          errorMessage: "",
          data: decodeTriviaData(results),
        });
      } catch (err) {
        // Display a generic error message
        setQuizFetch({
          isLoading: false,
          errorMessage: "Something went wrong. Please try again later. ",
          data: null,
        });
        // Display specific error for debugging in the console
        console.error(err);
      }
    }
    getQuiz();

    // TO DO: clean up if user leaves page before fetch finishes running
  }, [amount, difficulty]);
  // See above: component will run when amount changes

  // Hook needs to return something so quiz can get access to above data. Defines how hook is used
  const { isLoading, errorMessage, data } = quizFetch;
  return [isLoading, errorMessage, data];
}

export default useGetTriviaData;
