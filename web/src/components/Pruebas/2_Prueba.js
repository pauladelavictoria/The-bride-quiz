// Hooks
import { useState } from "react";
// Componentes
import truthsOrDares from "../../data/truthsOrDares";
import Header from "../Header";
import FinishScreen from "../FinishScreen";

const Prueba2 = (props) => {
  // variables estado
  const [currentDare, setCurrentDare] = useState(0);

  // Mostrar verdad
  const [showTruth, setShowTrue] = useState(false);

  const renderTrue = () => {
    setShowTrue(!showTruth);
  };

  //   Mostrar reto
  const [showDare, setShowDare] = useState(false);

  const renderDare = () => {
    setShowDare(!showDare);
  };

  // Siguiente reto
  const nextDare = () => {
    setCurrentDare(currentDare + 1);
    setShowTrue(false);
    setShowDare(false);
    props.setCurrentPlayer(props.currentPlayer + 1);
  };

  //Función para pintar el juego
  const renderGame = (props) => {
    return (
      <div className="container">
        {props.nextPlayer()}
        <h2 className="container_title">verdad o atrevimiento</h2>

        <button className="container_btn" onClick={renderTrue}>
          Verdad
        </button>
        {showTruth && (
          <p className="container_text">{truthsOrDares[currentDare].truth}</p>
        )}

        <button className="container_btn" onClick={renderDare}>
          Atrevimiento
        </button>
        {showDare && (
          <p className="container_text">{truthsOrDares[currentDare].dare}</p>
        )}

        {(showTruth || showDare) && (
          <button className="container_btn-next" onClick={nextDare}>
            Siguiente Reto
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <Header />
      {currentDare < props.numberOfPlayers ? renderGame() : <FinishScreen />}
    </div>
  );
};

export default Prueba2;
