import { useEffect, useState } from 'react';
import Dummy from '../dummy';
import SolutionLetters from '../SolutionLetters';
import callToApi from '../../service/CallToApi';



const Prueba3 = () => {
    const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState("");
  const [word, setWord] = useState("");


  const [userLetters, setuserLetters] = useState([]);
  const [arrayNotInclude, setArrayNotInclude] = useState([]);


  // const renderWords = () => {
  //   return props.hangman.map((word) => {
  //    setWord(word.Word)
  //   })
  // }
  
  // Hay que hacer un FETCH que vaya cambiando la palabra clave

// Función para letras acertadas
  const renderSolutionLetters = (index) => {
    const wordLetters = word.split('');
  
    return wordLetters.map(wordLetter => {
   return  userLetters.includes(wordLetter) ? <li key={index} className="letter">{wordLetter}</li> : <li key={index} className="letter"></li>
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
      setTimeout(()=>{setLastLetter('')}, 500)
    }
  };
    
    
    return (
        <div className="page">
             <header>
        <h1 className="header__title">Juego del ahorcado</h1>
        <h2 className="header__title-sec">¿Quién ha hecho qué?</h2>
      </header>
      <main className="main">
        <section>
         < SolutionLetters renderSolutionLetters={renderSolutionLetters} /> 
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
              {arrayNotInclude.map((eachLetter, index) => {
                return (
                  <li key={index} className="letter">
                    {eachLetter}
                  </li>
                );
              })}
            </ul>
          </div>
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
        < Dummy numberOfErrors={numberOfErrors}/>
      </main>
        </div>
    );
};

export default Prueba3;