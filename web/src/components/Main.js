import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// Imágenes
import Logo from "../images/logo-big.png";
import menu from "../images/menu.png";
import players from "../images/players.png";

const Main = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const selectNext = (ev) => {setSelectedCard(selectedCard + 1 > 2 ? 0 : selectedCard + 1)};
  const selectPrevious = (ev) => {setSelectedCard(selectedCard - 1 < 0 ? 2 : selectedCard - 1)};

  const classPosition0 = useRef('center')
  const classPosition1 = useRef('right')
  const classPosition2 = useRef('left')
  useEffect(() => {
    if (selectedCard === 0) {
      classPosition0.current = 'center'
      classPosition1.current = 'right'
      classPosition2.current = 'left'
    } else if (selectedCard === 1) {
      classPosition0.current = 'left'
      classPosition1.current = 'center'
      classPosition2.current = 'right'
    } else {
      classPosition0.current = 'right'
      classPosition1.current = 'left'
      classPosition2.current = 'center'
    }

    }, [selectedCard]);

  return (
    <div className="main">
      {/* Logo */}
      <img className="logoBig" src={Logo} alt="Logo The Bride Quiz" />

      {/* Tarjetas pruebas */}
      <div className="containerCards">
        <section className={`containerGame ${classPosition0.current}`}>
          <h2 className="containerGame_title">Juego de la ahogada</h2>
          <p className="containerGame_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            velit nulla tempore labore, exercitationem dignissimos assumenda
            rerum doloremque maxime a delectus
          </p>
          <Link className="Prueba_link" to="/Pruebas/Prueba3">
            <button className="containerGame_btn">Jugar</button>
          </Link>
        </section>

        <section className={`containerGame ${classPosition1.current}`}>
          <h2 className="containerGame_title">¿Cuánto sabes sobre bodas?</h2>
          <p className="containerGame_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            velit nulla tempore labore, exercitationem dignissimos assumenda
            rerum doloremque maxime a delectus
          </p>
          <Link className="Prueba_link" to="/Pruebas/Prueba1">
            <button className="containerGame_btn">Jugar</button>
          </Link>
        </section>

        <section className={`containerGame ${classPosition2.current}`}>
          <h2 className="containerGame_title">Verdad o Atrevimiento</h2>
          <p className="containerGame_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            velit nulla tempore labore, exercitationem dignissimos assumenda
            rerum doloremque maxime a delectus
          </p>
          <Link className="Prueba_link" to="/Pruebas/Prueba2">
            <button className="containerGame_btn">Jugar</button>
          </Link>
        </section>
      </div>

      {/* Botones enlaces */}
      <div className="containerBtn">
        <Link className="instructions_link" to="/Instructions">
          <img
            className="containerBtn_menu"
            src={menu}
            alt="Menu instrucciones"
          />
        </Link>

        <div>
          <button className="selectBtn" onClick={selectPrevious}> &#60;</button>
          <button className="selectBtn" onClick={selectNext}> &#62;</button>
        </div>

        <Link className="playersPage_link" to="/playersPage">
          <img
            className="containerBtn_menu"
            src={players}
            alt="Enlace para añadir jugadoras"
          />
        </Link>
      </div>
    </div>
  );
};

export default Main;
