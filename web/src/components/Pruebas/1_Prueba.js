import { useState } from 'react';
import Header from '../Header';
import questions from '../../data/questions';

const Prueba1 = () => {
  // Preguntas y respuestas
  const [correctAnswer, setCorrectAnwser] = useState(undefined);

  // Resultados
  const showCorrect = (ev) => {
    setCorrectAnwser(
      questions[currentQuestion].answerOptions[ev.currentTarget.id].isCorrect
    );
  };

  // Siguiente pregunta
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const nextDare = () => {
    setCurrentQuestion(currentQuestion + 1);
    setCorrectAnwser(undefined);
  };

  return (
    <div>
<Header/>
      <div className="container">
        <h2 className="container_questions">
          {questions[currentQuestion].questionText}
        </h2>

        <div className="container_answers">
        {questions[currentQuestion].answerOptions.map((answerOption, index) => {
          return (
            <button
              key={index}
              id={index}
              onClick={showCorrect}
              className="container_answers"
            >
              {answerOption.answer}
            </button>
          );
        })}

        {correctAnswer !== undefined &&
          (correctAnswer ? (
            <p>¡Correcto! Escoge quien quieres que beba un chupito </p>
          ) : (
            <p>Oh... Has fallado, te toca beber un chupito</p>
          ))}
</div>
        <button className="nextBtn" onClick={nextDare}>Siguiente pregunta</button>
      </div>
    </div>
  );
};

export default Prueba1;
