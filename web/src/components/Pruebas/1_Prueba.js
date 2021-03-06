// Hooks
import { useState, useEffect } from "react";
// Componentes
import Header from "../Header";
import questions from "../../data/questions";
import FinishScreen from "../FinishScreen";
import NextPlayer from "../NextPlayer";

const Prueba1 = (props) => {
  // Preguntas y respuestas
  const [correctAnswer, setCorrectAnwser] = useState(undefined);

  useEffect(() => {
    props.setCurrentPlayer(0);
  }, []);

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
    props.setCurrentPlayer(props.currentPlayer + 1);
  };

  //Función para pintar el juego
  const renderGame = () => {
    return (
      <div className="container">
        <NextPlayer players={props.players} currentPlayer={props.currentPlayer}/>
        <h2 className="container_questions">
          {questions[currentQuestion].questionText}
        </h2>

        <div className="container_answers">
          {questions[currentQuestion].answerOptions.map(
            (answerOption, index) => {
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
            }
          )}

          {correctAnswer !== undefined &&
            (correctAnswer ? (
              <p>¡Correcto! Escoge quien quieres que beba un chupito </p>
            ) : (
              <p>Oh... Has fallado, te toca beber un chupito</p>
            ))}
        </div>
        <button className="nextBtn" onClick={nextDare}>
          Siguiente pregunta
        </button>
      </div>
    );
  };

  return (
    <div>
      <Header />
      {currentQuestion < props.numberOfPlayers ? renderGame() : <FinishScreen players={props.players}/>}
    </div>
  );
};

export default Prueba1;
