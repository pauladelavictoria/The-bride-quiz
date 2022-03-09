// Función para mostrar e botón de siguiente palabra
// cuando se acierta la palabra y se gana el juego

const WinGame = (props) => {
    return (
        <div className="final">
              <p className="finishContainer_text final_text">Has ganado!</p>
              <button onClick={props.nextWord} className="final_btn clueBtn">
                Siguiente palabra
              </button>
        </div>
    );
};

export default WinGame;