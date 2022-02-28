// Hooks
import { useState } from "react";
// Componentes
import truthsOrDares from "../../data/truthsOrDares";
import Header from "../Header";


const Prueba2 = () => {
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
  };

  // Final de la prueba
  console.log(currentDare);
  console.log(truthsOrDares);

  const finalDare = () => {
    if (currentDare < truthsOrDares.length) {
      return (
        <div className="container">
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
    } else {
      return (
        <div>
          <p className="finalText">¡Has llegado al final del juego!</p>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <Header />
      {finalDare()}
      {/* <Header />
            <h2 className="container_title">verdad o atrevimiento</h2>

        <button className="container_btn" onClick={renderTrue}>Verdad</button>
       {showTruth && (<p className="container_text">
        {truthsOrDares[currentDare].truth}
            </p>)}

        <button  className="container_btn" onClick={renderDare}>Atrevimiento</button>
        {showDare && (<p className="container_text">
            {truthsOrDares[currentDare].dare}
            </p>)}

        {(showTruth || showDare) && <button className="container_btn-next" onClick={nextDare}>Siguiente Reto</button>} */}
    </div>
  );
};

export default Prueba2;
