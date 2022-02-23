import { useState } from "react";
// Componentes
import Dummy from "../Prueba3El/dummy";
import Header from "../Header";
import SolutionLetters from "../Prueba3El/SolutionLetters";
// API
import ApiWords from "../../service/ApiWords";

const Prueba3 = () => {
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState("");
  const [word, setWord] = useState("");
  const [clue, setClue] = useState("");

  const [userLetters, setuserLetters] = useState([]);
  const [arrayNotInclude, setArrayNotInclude] = useState([]);

  // const renderWords = () => {
  //   return props.hangman.map((word) => {
  //    setWord(word.Word)
  //   })
  // }

  const addWords = (ev) => {
    const newWord = {
      word: word,
      clue: clue,
    };
    ev.preventDefault();
    ApiWords(newWord).then((word) => {
      setWord(newWord.word);
      setWord(newWord.clue);
    });
  };

  console.log(addWords);

  // Función para letras acertadas
  const renderSolutionLetters = (index) => {
    const wordLetters = word.split("");

    return wordLetters.map((wordLetter) => {
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
        if (word.includes(inputLetter)) {
          setuserLetters([...userLetters, inputLetter]);
        } else {
          setArrayNotInclude([...arrayNotInclude, inputLetter]);
          console.log(arrayNotInclude);
          console.log("la letra no está");
          setNumberOfErrors(numberOfErrors + 1);
        }
      }
      // para que se borre el input
      setTimeout(() => {
        setLastLetter("");
      }, 500);
    }
  };

  return (
    <div className="page">
      <Header />

      <main className="container">
        <h1 className="container_title">Ahogada</h1>

        {/* FALTA EL TURNO */}
        <section>
          <SolutionLetters renderSolutionLetters={renderSolutionLetters} />

          <form className="form">
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
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
      {/* Error */}
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
        <button className="clueBtn">Pista!</button>
      </div>
    </div>
  );
};

export default Prueba3;
