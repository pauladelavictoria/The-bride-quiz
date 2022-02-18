import { useState } from "react";
import questions from "../../data/questions";

// un estado que es en qué pregunta estoy
// Tener funciones que van sumando
// Phase
// eL INDEX igual al usestate de esa pregunta
// hACER UN MAP DE LAS POSIBLES RESPUESTAS Y GENERAR BOTONES
// EN el onclick una función diferente si es true o false
// En la respuesta poner un botón que pinte siguiente pregunta y un estado que pinte las preguntas

const Prueba1 = () => {
  // Preguntas y respuestas
  
  const [correctAnswer0, setCorrectAnwser0] = useState();

  const [correctAnswer1, setCorrectAnwser1] = useState();
  const [correctAnswer2, setCorrectAnwser2] = useState();

  const [showAnswer0, setShowAnswer0] = useState(false);
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  // Resultados

  const showCorrect0 = () => {
    setCorrectAnwser0(questions[currentQuestion].answerOptions[0].isCorrect);
    setShowAnswer0(!showAnswer0);
  };

  const showCorrect1 = () => {
    setCorrectAnwser1(questions[currentQuestion].answerOptions[1].isCorrect);
    setShowAnswer1(!showAnswer1);
  };

  const showCorrect2 = () => {
    setCorrectAnwser2(questions[currentQuestion].answerOptions[2].isCorrect);
    setShowAnswer2(!showAnswer2);
  };

  // Siguiente pregunta
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const nextDare = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div>
      <div className="container">
        <h2 className="conatiner_questions">
          {questions[currentQuestion].questionText}
        </h2>
        <button onClick={showCorrect0} className="container_answers">
          {questions[currentQuestion].answerOptions[0].answerText}
        </button>
        {showAnswer0 && ((correctAnswer0) ? (
          <p>¡Correcto! Escoge quien quieres que beba un chupito </p>
        ) : (
          <p>Oh... Has fallado, te toca beber un chupito</p>
        ))}
        <button onClick={showCorrect1} className="container_answers">
          {questions[currentQuestion].answerOptions[1].answerText}
        </button>
        {showAnswer1 && ((correctAnswer1) ? (
          <p>¡Correcto! Escoge quien quieres que beba un chupito </p>
        ) : (
          <p>Oh... Has fallado, te toca beber un chupito</p>
        ))}
        <button onClick={showCorrect2} className="container_answers">
          {questions[currentQuestion].answerOptions[2].answerText}
        </button>
        {showAnswer2 && ((correctAnswer2) ? (
          <p>¡Correcto! Escoge quien quieres que beba un chupito </p>
        ) : (
          <p>Oh... Has fallado, te toca beber un chupito</p>
        ))}

        <button onClick={nextDare}>Siguiente pregunta</button>
      </div>
    </div>
  );
};

export default Prueba1;
