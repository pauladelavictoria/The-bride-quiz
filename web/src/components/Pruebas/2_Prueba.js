import { useState } from "react";
import {Link, Router} from "react-router-dom";
import truthsOrDares from '../../data/truthsOrDares'
import Header from '../Header';

// Meterlas dentro de un json y que las traiga cada vez que se pulsa el botón?

const Prueba2 = () => {
    // variables estado
const [currentDare, setCurrentDare] = useState(0)

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

  const nextDare = () => {
    setCurrentDare(currentDare + 1);
    setShowTrue(false);
    setShowDare(false);
  };


    return (
        <div className="container">
             <Header />
            <h2 className="container_title">verdad o atrevimiento</h2>

        <button className="container_btn" onClick={renderTrue}>Verdad</button>
       {showTruth && (<p className="container_text">
        {truthsOrDares[currentDare].truth}
            </p>)}

        <button  className="container_btn" onClick={renderDare}>Atrevimiento</button>
        {showDare && (<p className="container_text">
            {truthsOrDares[currentDare].dare}
            </p>)}

        {(showTruth || showDare) && <button className="container_btn-next" onClick={nextDare}>Siguiente Reto</button>}


        </div>
    );
};

export default Prueba2;