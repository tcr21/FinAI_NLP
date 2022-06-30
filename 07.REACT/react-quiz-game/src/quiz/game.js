// Use rfce shortcut to get component (only modification is don't need import line)
import { useState } from "react";
import EndScreen from "./end-screen";
import Stats from "./stats";
import TriviaItem from "./trivia-item";
import triviaData from "./trivia-data";
import { FadeTransition, FadeWrapper } from "./fade-transition";

/**
 * Game determines flow of quiz
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.bestScore
 * @param {function} props.onRetryClick A function that runs when retry button is clicked
 */

// Has 3 different elements of state
function Game() {
  const [gameState, setGameState] = useState({
    score: 0,
    triviaIndex: 0,
    isGameOver: false,
  });

  const { score, triviaIndex, isGameOver } = gameState;
  const questionNumber = triviaIndex + 1;
  const numQuestions = triviaData.length;

  const restartGame = () => {
    setGameState({
      score: 0,
      triviaIndex: 0,
      isGameOver: false,
    });
  };

  const loadNextQuestion = () => {
    if (triviaIndex >= triviaData.length - 1) {
      setGameState({ ...gameState, isGameOver: true });
    } else {
      // Using spread operator to copy gameState and override triviaIndex
      setGameState({
        ...gameState,
        triviaIndex: triviaIndex + 1,
      });
    }
  };

  const onAnswerSelected = (wasPlayerCorrect) => {
    if (wasPlayerCorrect) {
      setGameState({
        ...gameState,
        score: score + 1,
      });
    }
  };

  let pageContent;
  let pageKey;

  if (isGameOver) {
    pageKey = "EndScreen";
    pageContent = (
      <EndScreen score={score} bestScore={0} onRetryClick={restartGame} />
    );
  } else {
    pageKey = triviaIndex;
    const triviaQuestion = triviaData[triviaIndex];
    const { correct_answer, incorrect_answers, question } = triviaQuestion;
    pageContent = (
      <TriviaItem
        key={triviaIndex}
        question={question}
        correctAnswer={correct_answer}
        incorrectAnswers={incorrect_answers}
        onNextClick={loadNextQuestion}
        onAnswerSelected={onAnswerSelected}
      />
    );
  }

  return (
    // Can remove div (ie no HTML) and just have <> ie a React fragment to act as parent element to group
    <>
      <Stats
        score={score}
        questionNumber={questionNumber}
        totalQuestions={numQuestions}
      />
      <FadeWrapper>
        <FadeTransition key={pageKey}>{pageContent}</FadeTransition>
      </FadeWrapper>
    </>
  );
}

export default Game;
