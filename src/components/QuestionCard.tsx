import React from "react";
import { IUserAnswer } from '../App'; 

interface IProps {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: IUserAnswer | undefined;
  questionNr: number;
  totalQuestions: number;
}


//This !! was pretty cool, basically the same as userAnswer ? true : false; 
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

      {!!userAnswer && userAnswer.correct && (<p>Correct!</p>)}
      {!!userAnswer && userAnswer.correct && (<p>Wrong!</p>)}
      
      {answers.map((answer, i) => (
        <div key={answer}>
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
