import { Route, Switch } from "react-router-dom";
import { useState } from "react";
// estilos
import "../style/App.scss";
// Componentes
import PlayersPage from "./PlayersPage";
import Instructions from "./Instructions";
import Turn from "./Turn";
import Main from "./Main";
import Prueba1 from "./Pruebas/1_Prueba";
import Prueba2 from "./Pruebas/2_Prueba";
import Prueba3 from "./Pruebas/3_Prueba";

const App = () => {
  // Variables estado playersPage
  const [players, setPlayers] = useState([]);

   // variable estado jugadora
   const [currentPlayer, setCurrentPlayer] = useState(0);
  
   const nextPlayer = () => {
       return (<><h2>Le toca jugar a: {players[currentPlayer].name}  </h2></>)
   }

  return (
    <>
      <Switch>
        <Route path="/Pruebas/Prueba1" exact>
          <Prueba1 nextPlayer={nextPlayer} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>
        </Route>
        <Route path="/Pruebas/Prueba2" exact>
          <Prueba2 nextPlayer={nextPlayer}/>
        </Route>
        <Route path="/Pruebas/Prueba3" exact>
          <Prueba3 nextPlayer={nextPlayer}/>
        </Route>
        <Route path="/playersPage" exact>
          <PlayersPage players={players} setPlayers={setPlayers} />
        </Route>
        <Route path="/Instructions" exact>
          <Instructions />
        </Route>
        <Route path="/Turn" exact>
          <Turn players={players} setPlayers={setPlayers}/>
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
      </Switch>
    </>
  );
};

export default App;
