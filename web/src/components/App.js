import { Route, Switch } from "react-router-dom";
// estilos
import "../style/App.scss";
// Componentes
import PlayersPage from "./PlayersPage";
import Instructions from "./Instructions";
import Main from "./Main";
import Prueba1 from "./Pruebas/1_Prueba";
import Prueba2 from "./Pruebas/2_Prueba";
import Prueba3 from "./Pruebas/3_Prueba";


const App = () => {
  return (
<>
        <Switch>
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
          <Route path="/Instructions" exact>
            <Instructions />
          </Route>
          <Route path="/" exact>
          <Main />
          </Route>
        </Switch>
      
      </>
  );
};

export default App;
