import { useState, useEffect } from "react";
// Componentes
import Dummy from "../Prueba3El/dummy";
import Header from "../Header";
import SolutionLetters from "../Prueba3El/SolutionLetters";
import FinishScreen from "../FinishScreen";
// API
import { getWords } from "../../service/ApiWords";

const Prueba3 = (props) => {
  // Variables estado
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState("");
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [showClue, setShowClue] = useState(false);

  const [userLetters, setuserLetters] = useState([]);
  const [arrayNotInclude, setArrayNotInclude] = useState([]);

  // useEffect para traer las palabras y pistas de la bbdd al cargar la página
  useEffect(() => {
    getWords().then((response) => {
      setWords(response);
    });
  }, []);

  // Función para letras acertadas
  const renderSolutionLetters = (index) => {
    const wordLetters = words[currentWord]?.word.split("");

    return wordLetters?.map((wordLetter) => {
      return userLetters.includes(wordLetter) ? (
        <li key={index} className="letter">
          {wordLetter}
        </li>
      ) : (
        <li key={index} className="letter"></li>
      );
    });
  };

  // Función manejadora del estado
  const handleKeyUp = (ev) => {
    const inputLetter = ev.currentTarget.value;
    if (inputLetter.match("^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$")) {
      setLastLetter(inputLetter);
      if (inputLetter !== "") {
        if (words[currentWord]?.word.includes(inputLetter)) {
          setuserLetters([...userLetters, inputLetter]);
        } else {
          setArrayNotInclude([...arrayNotInclude, inputLetter]);
          setNumberOfErrors(numberOfErrors + 1);
        }
      }

      // Timer para que se borre el input
      setTimeout(() => {
        setLastLetter("");
      }, 500);
    }
  };

  // Mostrar la pista
  const toggleShowClue = () => {
    setShowClue(!showClue);
  };

  // Siguiente palabra
  const nextWord = (props) => {
    setCurrentWord(currentWord + 1);
    props.setCurrentPlayer(props.currentPlayer + 1);
  };

  console.log(props.player);
  console.log(props.currentPlayer);
  //Función para pintar el juego
  const renderGame = () => {
      return (
        <>
        {props.nextPlayer()} 
          <main className="container">
          
            <h1 className="container_title">Ahogada</h1>
           

            <section>
              <SolutionLetters renderSolutionLetters={renderSolutionLetters} />

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
            <Dummy numberOfErrors={numberOfErrors} />
          </main>
          <div className="error">
            <div className="error_flex">
              <h2 className="error_title">Letras falladas:</h2>
              <ul className="error_letters">
                {arrayNotInclude.map((eachLetter, index) => {
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
            {showClue && (
              <p className="container_text">{words[currentWord]?.clue}</p>
            )}
            <button onClick={nextWord} className="clueBtn">
              Siguiente palabra
            </button>
          </div>
        </>
      );
  };

  return (
    <div className="page">
      <Header />
      {(currentWord < props.numberOfPlayers) ? renderGame() : <FinishScreen />}
     </div>
  );
};

export default Prueba3;
