import { useState } from "react";
// COMPONENTES
import Header from "./Header";

const Instructions = () => {
  // Mostrar instrucciones

  const [showInstruction, setShowInstruction] = useState(undefined);
  const renderInstruction = (ev) => {
    setShowInstruction(
      ev.currentTarget.id !== showInstruction ? ev.currentTarget.id : undefined
    );
  };

  return (
    <div className="instructions">
      <Header />
      <p className="instructions_text">
        ¡Bienvenidas a The bride Quiz! <br />
        En este juego podrás reirte con tus amigas mientras celebras la
        despedida de soltera. <br />
        Hay tres pantallas, escoge la que más te llame la atención y acierta o
        bebe. <br />
      </p>
      <button id="1" onClick={renderInstruction} className="instructions_btn">
        Juego de la ahogada
      </button>
      {showInstruction === "1" && (
        <p className="instructions_text">
          En esta pantalla se escoge una palabra aleatoria y una pista. <br />
          Se trata de adivinar la palabra antes de consumir el número máximo de
          errores. <br />
          Escoger la pista supone sumar un error. <br />
          En caso de no conseguirlo, hay que beber un chupito y pasar el
          teléfono a la próxima jugadora.
        </p>
      )}
      <button id="2" onClick={renderInstruction} className="instructions_btn">
        ¿Cuánto sabes sobre bodas?
      </button>
      {showInstruction === "2" && (
        <p className="instructions_text">
          En esta pantalla aparece una pregunta con tres posibles opciones.
          <br />
          Se trata de adivinar cuál es la correcta. <br />
          Solo tienes una oportunidad de acertar. <br />
          en caso de acierto, escoge quién bebe un chupito, si no es así, bebe
          un chupito y pasa el teléfono a la próxima jugadora.
        </p>
      )}
      <button id="3" onClick={renderInstruction} className="instructions_btn">
        Verdad o Atrevimiento
      </button>
      {showInstruction === "3" && (
        <p className="instructions_text">
          En esta pantalla hay que escoger entre contar una verdad o atreverse
          con un reto. <br />
          Pulsa el botón que prefieras para que aparezca tu verdad o reto.
          <br />
          En caso de no querer contar la verdad o realizar el reto, hay que
          beber un chupito y pasar el teléfono a la próxima jugadora.
        </p>
      )}
    </div>
  );
};

export default Instructions;
