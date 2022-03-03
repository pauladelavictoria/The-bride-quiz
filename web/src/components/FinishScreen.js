const FinishScreen = () => {
  return (
    <div className="finishContainer">
      <p className="finishContainer_text">¡Enhorabuena, has llegado al final del juego!</p>
      <p className="finishContainer_text-btn">Pulsa el botón de la parte superior para volver a la página de inicio.</p>
    </div>
  );
  
};

// PASAR POR PROPS EL NÚMERO DE JUGADORAS PARA QUE AL INICIO QUE HAY CERO 
// SIGA SALIENDO LA PANTALLA DEL JUEGO CON UN AVISO

export default FinishScreen;
