import React, { useState } from "react";
import { fetchQuizQuestions, Difficulty, IQuestion } from "./API";
import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./images/background-image.jpg";

//Components
import QuestionCard from "./components/QuestionCard";


const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

  html {
    min-height:100%;
  }

  body {
    background-image: url(${BGImage});
    background-size: cover; 
    line-height: 1.7;
    min-height:100%;
  }
`;


const TOTAL_QUESTIONS = 10;

export interface IUserAnswer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [questionNumer, setQuestionNumer] = useState(0);
  const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async (e: any) => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumer(0);
    setLoading(false);
  };

  //Kan også bruke e: React.MouseEvent<HTMLButtonElement>
  const checkAnswer = (e: any) => {
    const answer = e.currentTarget.value;

    const correct = questions[questionNumer].correct_answer === answer;

    if (correct) setScore((prev) => prev + 1);

    //Save answer in the array for user answers
    const answerObject: IUserAnswer = {
      question: questions[questionNumer].question,
      answer,
      correct,
      correctAnswer: questions[questionNumer].correct_answer,
    };

    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestion = questionNumer + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumer(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <h1>REACT QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}

        {!gameOver && <p className="score">Score: {score}</p>}

        {loading && <p>Loading Questions ...</p>}

        {!loading && !gameOver ? (
          <QuestionCard
            questionNr={questionNumer + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumer].question}
            answers={questions[questionNumer].answers}
            userAnswer={userAnswers ? userAnswers[questionNumer] : undefined}
            callback={checkAnswer}
          />
        ) : null}

        {!gameOver &&
          !loading &&
          userAnswers.length === questionNumer + 1 &&
          questionNumer !== TOTAL_QUESTIONS - 1 && (
            <button onClick={nextQuestion}>Next Question</button>
          )}
      </div>
    </>
  );
};

export default App;
