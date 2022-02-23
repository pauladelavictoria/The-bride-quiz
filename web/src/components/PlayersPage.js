import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { createPlayer, deletePlayer, getPlayers } from "../service/ApiPlayers";

const PlayersPage = () => {
  // Variables estado
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  // Guardar el nombre de las jugadoras
  const handleNewPlayer = (ev) => {
    setNewPlayerName(ev.currentTarget.value);
  };

  useEffect(() => {
    getPlayers().then((response) => {
      setPlayers(response);
    });
  }, []);

  // Eliminar jugadora
  const handleDeletePlayer = (ev) => {
    deletePlayer({ id: ev.currentTarget.id }).then((response) => {
      setPlayers(
        players.filter((player) => {
          return player.id !== response.id;
        })
      );
    });
  };

  const addPlayer = (ev) => {
    const newPlayer = {
      name: newPlayerName,
    };
    ev.preventDefault();
    createPlayer(newPlayer).then((player) => {
      setPlayers([...players, player.playerData]);
    });
  };

  return (
    <div className="players">
      <Header />
      <h2 className="players_title">Players</h2>
      <ul className="players_list">
        {players.map((player) => (
          <li className="players_list-player" key={player.id}>
            <p className="players_list-text">{player.name}</p>
            <button
              id={player.id}
              className="players_list-btn"
              onClick={handleDeletePlayer}
            >
              -
            </button>
          </li>
        ))}
      </ul>

      <div className="players_addPlayer">
        <label htmlFor="NewPlayer" className="players_addPlayer-title">
          Añade una nueva jugadora:
        </label>
        <div className="players_addPlayer-container">
        <input
          className="players_addPlayer-input"
          value={newPlayerName}
          onChange={handleNewPlayer}
          type="text"
          id="NewPlayer"
          name="NewPlayer"
          placeholder="Ej: Falta"
        />
        <button className="players_addPlayer-btn" onClick={addPlayer}>
          +
        </button>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
