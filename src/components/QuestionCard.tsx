import React from "react";

interface IProps {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<IProps> = ({
  question,
  answers,
  callback,
  questionNr,
  totalQuestions,
  userAnswer,
}) => (
  <div>
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />

    <div>
      {answers.map((answer) => (
        <div>
          <button disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
