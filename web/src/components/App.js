import { Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/App.scss";
import PlayersPage from "./PlayersPage";
import Instructions from "./Instructions";
import Main from "./Main";
import Prueba1 from "./Pruebas/1_Prueba";
import Prueba2 from "./Pruebas/2_Prueba";
import Prueba3 from "./Pruebas/3_Prueba";
import Welcome from "./Welcome";
import { getPlayers } from "../service/ApiPlayers";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("authenticatedUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthenticatedUser(user);
      getPlayers().then((response) => {
        const groupPlayers = response.filter(p => !p.isGroup && p.groupCode === user.groupCode);
        setPlayers(groupPlayers);
      });
    }
  }, []);

  const handleLoginSuccess = (user, allPlayers) => {
    sessionStorage.setItem("authenticatedUser", JSON.stringify(user));
    setAuthenticatedUser(user);
    const groupPlayers = allPlayers.filter(p => !p.isGroup && p.groupCode === user.groupCode);
    setPlayers(groupPlayers);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authenticatedUser");
    setAuthenticatedUser(null);
    setPlayers([]);
    setCurrentPlayer(0);
  };

  const [currentPlayer, setCurrentPlayer] = useState(0);

  return (
    <>
      <Switch>
        <Route path="/Pruebas/Prueba1" exact>
          {authenticatedUser ? (
            <Prueba1
              players={players}
              numberOfPlayers={players.length}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
            />
          ) : <Redirect to="/" />}
        </Route>
        <Route path="/Pruebas/Prueba2" exact>
          {authenticatedUser ? (
            <Prueba2
              players={players}
              numberOfPlayers={players.length}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
            />
          ) : <Redirect to="/" />}
        </Route>
        <Route path="/Pruebas/Prueba3" exact>
          {authenticatedUser ? (
            <Prueba3
              players={players}
              numberOfPlayers={players.length}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
            />
          ) : <Redirect to="/" />}
        </Route>
        <Route path="/playersPage" exact>
          {authenticatedUser ? (
            <PlayersPage
              players={players}
              setPlayers={setPlayers}
              authenticatedUser={authenticatedUser}
            />
          ) : <Redirect to="/" />}
        </Route>
        <Route path="/Instructions" exact>
          <Instructions />
        </Route>
        <Route path="/games" exact>
          {authenticatedUser ? (
            <Main
              numberOfPlayers={players.length}
              authenticatedUser={authenticatedUser}
              onLogout={handleLogout}
            />
          ) : <Redirect to="/" />}
        </Route>
        <Route path="/" exact>
          {authenticatedUser ? (
            <Redirect to="/games" />
          ) : (
            <Welcome onLoginSuccess={handleLoginSuccess} />
          )}
        </Route>
      </Switch>
    </>
  );
};

export default App;
