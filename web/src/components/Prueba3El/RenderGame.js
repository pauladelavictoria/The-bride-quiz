import { useState } from "react";
// Componentes
import NextPlayer from "../NextPlayer";
import SolutionLetters from "./SolutionLetters";
import Dummy from "./Dummy";

//Función para pintar el juego
const RenderGame = (props) => {
    
  const [lastLetter, setLastLetter] = useState("");

  // Mostrar la pista
  const toggleShowClue = () => {
    props.setShowClue(!props.showClue);
  };

  // Función manejadora del estado
  const handleKeyUp = (ev) => {
    const inputLetter = ev.currentTarget.value;
    if (inputLetter.match("^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$")) {
      setLastLetter(inputLetter);
      if (inputLetter !== "") {
        if (props.words[props.currentWord]?.word.includes(inputLetter)) {
          props.setuserLetters([...props.userLetters, inputLetter]);
        } else {
          props.setArrayNotInclude([...props.arrayNotInclude, inputLetter]);
          props.setNumberOfErrors(props.numberOfErrors + 1);
        }
      }
      // Timer para que se borre el input
      setTimeout(() => {
        setLastLetter("");
      }, 500);
    }
  };

  return (
    <div>
      <NextPlayer players={props.players} currentPlayer={props.currentPlayer} />
      <main className="container">
        <h1 className="container_title">Ahogada</h1>

        <section>
          <SolutionLetters
            word={props.words[props.currentWord]?.word}
            userLetters={props.userLetters}
          />
          <form className="form">
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              autoFocus
              type="text"
              name="last-letter"
              id="last-letter"
              onChange={handleKeyUp}
              value={lastLetter}
            />
          </form>
        </section>
        <Dummy numberOfErrors={props.numberOfErrors} />
      </main>
      <div className="error">
        <div className="error_flex">
          <h2 className="error_title">Letras falladas:</h2>
          <ul className="error_letters">
            {props.arrayNotInclude.map((eachLetter, index) => {
              return (
                <li key={index} className="error_letter">
                  {eachLetter}
                </li>
              );
            })}
          </ul>
        </div>
        <button onClick={toggleShowClue} className="clueBtn">
          Pista!
        </button>
        {props.showClue && (
          <p className="container_text">
            {props.words[props.currentWord]?.clue}
          </p>
        )}
      </div>
    </div>
  );
};

export default RenderGame;
