import Dummy from "./Dummy";

// Función para mostrar el botón de siguiente palabra
// cuando se llega a 5 fallos y se pierde el juego
const MaxError = (props) => {
  return (
    <div>
      <div className="final">
        <Dummy numberOfErrors={props.numberOfErrors} />
        <p className="finishContainer_text final_text">
          Oh! Has perdido, bebe un chupito y pasa el móvil a la siguiente
        </p>
        <button onClick={props.nextWord} className="final_btn clueBtn">
          Siguiente palabra
        </button>
      </div>
    </div>
  );
};

export default MaxError;

