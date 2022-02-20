import { Link, Route, Switch } from "react-router-dom";
// estilos
import "../style/App.scss";
// Componentes
import PlayersPage from "./PlayersPage";
import Prueba1 from "./Pruebas/1_Prueba";
import Prueba2 from "./Pruebas/2_Prueba";
import Prueba3 from "./Pruebas/3_Prueba";

const App = () => {
  
  return (
    <div>
      <Link className="Prueba_link" to="/Pruebas/Prueba1">
        Prueba 1
      </Link>
      <Link className="Prueba_link" to="/Pruebas/Prueba2">
        Prueba 2
      </Link>
      <Link className="Prueba_link" to="/Pruebas/Prueba3">
        Prueba 3
      </Link>
      <Link className="playersPage_link" to="/playersPage">
        Añade jugadoras 👰🏻
      </Link>
      <Switch>
        <Route path="/" exact></Route>
        <Route path="/Pruebas/Prueba1" exact>
          <Prueba1 />
        </Route>
        <Route path="/Pruebas/Prueba2" exact>
          <Prueba2 />
        </Route>
        <Route path="/Pruebas/Prueba3" exact>
          <Prueba3 />
        </Route>
        <Route path="/playersPage" exact>
          <PlayersPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
