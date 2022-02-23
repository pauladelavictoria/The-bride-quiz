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
        <div>
             <Header />
            <h2>verdad o atrevimiento</h2>

        <button onClick={renderTrue}>Verdad</button>
       {showTruth && (<p>
        {truthsOrDares[currentDare].truth}
            </p>)}

        <button onClick={renderDare}>Atrevimiento</button>
        {showDare && (<p>
            {truthsOrDares[currentDare].dare}
            </p>)}

        {(showTruth || showDare) && <button onClick={nextDare}>Siguiente Reto</button>}


            {/* <Link className="link" to="/Prueba2/segunda"> siguiente prueba </Link> */}


        </div>
    );
};

export default Prueba2;