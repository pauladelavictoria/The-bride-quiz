// import { useState, useEffect } from "react";
// // Componentes
// import Header from "../Header";
// import FinishScreen from "../FinishScreen";
// import MaxError from "../Prueba3El/MaxError";
// import WinGame from "../Prueba3El/WinGame";
// import RenderGame from "../Prueba3El/RenderGame";
// // API
// import { getWords } from "../../service/ApiWords";

// const Prueba3 = (props) => {
//   // Variables estado
//   const [numberOfErrors, setNumberOfErrors] = useState(0);
//   const [showClue, setShowClue] = useState(false);
//   const [words, setWords] = useState([]);
//   const [currentWord, setCurrentWord] = useState(0);
//   const [userLetters, setuserLetters] = useState([]);
//   const [arrayNotInclude, setArrayNotInclude] = useState([]);

//   // useEffect para traer las palabras y pistas de la bbdd al cargar la página
//   useEffect(() => {
//     props.setCurrentPlayer(0);
//     getWords().then((response) => {
//       setWords(response);
//     });
//   }, []);

//   // Siguiente palabra
//   const nextWord = () => {
//     setCurrentWord(currentWord + 1);
//     setNumberOfErrors(0);
//     setArrayNotInclude([]);
//     setuserLetters([]);
//     setShowClue(false);
//     props.setCurrentPlayer(props.currentPlayer + 1);
//   };

//   const getMainComponent = () => {
//     if (currentWord < props.numberOfPlayers) {
//       if (numberOfErrors === 5) {
//         return <MaxError nextWord={nextWord} numberOfErrors={numberOfErrors} />;
//       } else {
//         const wordLetters = words[currentWord]?.word.split("");
//         if (wordLetters?.every((letter) => userLetters.includes(letter))) {
//           return <WinGame nextWord={nextWord} />;
//         } else {
//           return <RenderGame words={words} currentWord={currentWord} userLetters={userLetters}  setuserLetters={setuserLetters} arrayNotInclude={arrayNotInclude} setArrayNotInclude={setArrayNotInclude}
//           numberOfErrors={numberOfErrors}
//           showClue={showClue}
//           setShowClue={setShowClue}/>;
//         }
//       }
//     } else {
//       return <FinishScreen players={props.players}  />;
//     }
//   };

//   return (
//     <div className="page">
//       <Header />
//       {getMainComponent()}
//     </div>
//   );
// };

// export default Prueba3;

import { useState, useEffect } from "react";
// Componentes
import Dummy from "../Prueba3El/dummy";
import Header from "../Header";
import SolutionLetters from "../Prueba3El/SolutionLetters";
import FinishScreen from "../FinishScreen";
// API
import { getWords } from "../../service/ApiWords";
import NextPlayer from "../NextPlayer";

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
    props.setCurrentPlayer(0);
    getWords().then((response) => {
      setWords(response);
    });
  }, []);

  

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
  const nextWord = () => {
    setCurrentWord(currentWord + 1);
    setNumberOfErrors(0);
    setArrayNotInclude([]);
    setuserLetters([]);
    setShowClue(false);
    props.setCurrentPlayer(props.currentPlayer + 1);
  };

  // Función para mostrar e botón de siguiente palabra
  // cuando se llega a 5 fallos y se pierde el juego
  const maxError = () => {
    return (
      <div className="final">
        <Dummy numberOfErrors={numberOfErrors} />
        <p className="finishContainer_text final_text">
          Oh! Has perdido, bebe un chupito y pasa el móvil a la siguiente
        </p>
        <button onClick={nextWord} className="final_btn clueBtn">
          Siguiente palabra
        </button>
      </div>
    );
  };

  //Función para pintar el juego
  const renderGame = () => {
    return (
      <>
        <NextPlayer players={props.players} currentPlayer={props.currentPlayer}/>
        <main className="container">
          <h1 className="container_title">Ahogada</h1>

          <section>
            <SolutionLetters word={words[currentWord]?.word} 
            userLetters={userLetters} />
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
        </div>
      </>
    );
  };

  const getMainComponent = () => {
    if (currentWord < props.numberOfPlayers) {
      if (numberOfErrors === 5) {
        return maxError();
      } else {
        const wordLetters = words[currentWord]?.word.split("");
        if (wordLetters?.every((letter) => userLetters.includes(letter))) {
          return (
            <>
              <p>Hs ganao</p>
              <button onClick={nextWord} className="final_btn clueBtn">
                Siguiente palabra
              </button>
            </>
          );
        } else {
          return renderGame();
        }
      }
    } else {
      return <FinishScreen players={props.players} />;
    }
  };

  return (
    <div className="page">
      <Header />
      {getMainComponent()}
    </div>
  );
};

export default Prueba3;