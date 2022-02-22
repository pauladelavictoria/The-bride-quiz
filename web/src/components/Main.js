import { Link } from "react-router-dom";
import { useState } from "react";
// Imágenes
import Logo from "../images/logo-big.png";
import menu from "../images/menu.png";
import players from "../images/players.png";

const Main = () => {
  const [selectedCard, setSelectedCard] = useState("2");

  const selectOne = (ev) => {setSelectedCard("1")};
  const selectTwo = (ev) => {setSelectedCard("2")};
  const selectThree = (ev) => {setSelectedCard("3")};


  return (
    <div className="main">
      {/* Logo */}
      <img className="logoBig" src={Logo} alt="Logo The Bride Quiz" />

      {/* Tarjetas pruebas */}
      <div className="containerCards">
        <section className="containerGame left">
          <h2 className="containerGame_title">Juego de la ahogada</h2>
          <p className="containerGame_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            velit nulla tempore labore, exercitationem dignissimos assumenda
            rerum doloremque maxime a delectus quam corporis porro dicta
            doloribus provident iure expedita ex!
          </p>
          <Link className="Prueba_link" to="/Pruebas/Prueba3">
            <button className="containerGame_btn">Jugar</button>
          </Link>
        </section>

        <section className="containerGame center">
          <h2 className="containerGame_title">¿Cuánto sabes sobre bodas?</h2>
          <p className="containerGame_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            velit nulla tempore labore, exercitationem dignissimos assumenda
            rerum doloremque maxime a delectus quam corporis porro dicta
            doloribus provident iure expedita ex!
          </p>
          <Link className="Prueba_link" to="/Pruebas/Prueba1">
            <button className="containerGame_btn">Jugar</button>
          </Link>
        </section>

        <section className="containerGame right">
          <h2 className="containerGame_title">Verdad o Atrevimiento</h2>
          <p className="containerGame_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            velit nulla tempore labore, exercitationem dignissimos assumenda
            rerum doloremque maxime a delectus quam corporis porro dicta
            doloribus provident iure expedita ex!
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
          <button className="selectBtn" onClick={selectOne}>·</button>
          <button className="selectBtn" onClick={selectTwo}>·</button>
          <button className="selectBtn" onClick={selectThree}>·</button>
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
