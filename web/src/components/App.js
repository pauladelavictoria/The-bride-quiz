import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
// estilos
import "../style/App.scss";
// Componentes
import PlayersPage from "./PlayersPage";
import Instructions from "./Instructions";
import Main from "./Main";
import Prueba1 from "./Pruebas/1_Prueba";
import Prueba2 from "./Pruebas/2_Prueba";
import Prueba3 from "./Pruebas/3_Prueba";
import { getPlayers } from "../service/ApiPlayers";

const App = () => {
  // Variables estado playersPage
  const [players, setPlayers] = useState([]);

  // useEffect bbdd players
  useEffect(() => {
    getPlayers().then((response) => {
      setPlayers(response);
    });
  }, []);

   // variable estado jugadora
   const [currentPlayer, setCurrentPlayer] = useState(0);
  
   const nextPlayer = () => {
       return (players?.length > 0) ? <h2>Le toca jugar a: {players[currentPlayer].name}</h2> : ''
   }


  return (
    <>
      <Switch>
        <Route path="/Pruebas/Prueba1" exact>
          <Prueba1 
          players={players}
          nextPlayer={nextPlayer} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} numberOfPlayers={players.length}/>
        </Route>
        <Route path="/Pruebas/Prueba2" exact>
          <Prueba2 players={players}
          nextPlayer={nextPlayer} numberOfPlayers={players.length} setCurrentPlayer={setCurrentPlayer}
          currentPlayer={currentPlayer}/>
          
        </Route>
        <Route path="/Pruebas/Prueba3" exact>
          <Prueba3 players={players}
          nextPlayer={nextPlayer} numberOfPlayers={players.length}
          setCurrentPlayer={setCurrentPlayer}
          currentPlayer={currentPlayer}/>
        </Route>
        <Route path="/playersPage" exact>
          <PlayersPage players={players} setPlayers={setPlayers} />
        </Route>
        <Route path="/Instructions" exact>
          <Instructions />
        </Route>
        <Route path="/" exact>
          <Main numberOfPlayers={players.length} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
