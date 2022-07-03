// Use rfce shortcut to get component (only modification is don't need import line)
import { useState } from "react";
import EndScreen from "./end-screen";
import Stats from "./stats";
import TriviaItem from "./trivia-item";
import { FadeTransition, FadeWrapper } from "./fade-transition";
import StartScreen from "./start-screen";

/**
 * Game determines flow of quiz
 */
//  @param {object} props
//  * @param {number} props.score
//  * @param {number} props.bestScore
//  * @param {function} props.onRetryClick A function that runs when retry button is clicked

// Has 3 different elements of state
function Game({ quizData }) {
  const [gameState, setGameState] = useState({
    score: 0,
    triviaIndex: 0,
    state: "start",
  });

  const questions = quizData.questions ?? [];
  const { score, triviaIndex, state } = gameState;
  const questionNumber = triviaIndex + 1;
  const numQuestions = questions.length;

  const restartGame = () => {
    setGameState({
      score: 0,
      triviaIndex: 0,
      state: "start",
    });
  };

  const onStart = () => {
    setGameState({
      score: 0,
      triviaIndex: 0,
      state: "running",
    });
  };

  const loadNextQuestion = () => {
    if (triviaIndex >= questions.length - 1) {
      setGameState({ ...gameState, state: "end" });
    } else {
      // Using spread operator to copy gameState and override triviaIndex
      setGameState({
        ...gameState,
        state: "running",
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

  if (state === "start") {
    pageKey = "QuizDetails";
    pageContent = <StartScreen quizData={quizData} onPlayClick={onStart} />;
  } else if (state === "end") {
    pageKey = "EndScreen";
    pageContent = (
      <EndScreen score={score} bestScore={0} onRetryClick={restartGame} />
    );
  } else {
    pageKey = triviaIndex;
    const triviaQuestion = questions[triviaIndex];
    const { correctAnswer, incorrectAnswers, question } = triviaQuestion;
    pageContent = (
      <TriviaItem
        key={triviaIndex}
        question={question}
        correctAnswer={correctAnswer}
        incorrectAnswers={incorrectAnswers}
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
