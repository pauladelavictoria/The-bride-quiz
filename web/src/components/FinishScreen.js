import { Link } from "react-router-dom";
import players from "../images/players.png"

const FinishScreen = (props) => {
  console.log(props.players.length);
  return (
    <>
      {props.players.length === 0 ? (
        <div className="addplayers">
          <h2 className="addplayers_text">
            Añade el nombre de las jugadoras antes de comenzar
          </h2>
          <Link className="addplayers_link" to="/playersPage">
            <img
              className="addplayers_link"
              src={players}
              alt="Enlace para añadir jugadoras"
            />
          </Link>
        </div>
      ) : (
        <div className="finishContainer">
          <p className="finishContainer_text">
            ¡Enhorabuena, has llegado al final del juego!
          </p>
          <p className="finishContainer_text-btn">
            Pulsa el botón de la parte superior para volver a la página de
            inicio.
          </p>
        </div>
      )}
    </>
  );
};

export default FinishScreen;
