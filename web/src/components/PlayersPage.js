import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import ApiPlayers from '../service/ApiPlayers';


const PlayersPage = () => {
  // Variables estado
  const [players, setPlayers] = useState([{ name: "", id: "" }]);
  const [newPlayerName, setNewPlayerName] = useState("");


  // Guardar el nombre de las jugadoras
  const handleNewPlayer = (ev) => {
    setNewPlayerName(ev.currentTarget.value);
  };

  // Eliminar jugadora
  const deletePlayer = (ev) => {
    const filterPlayers = players.filter((player) => player.id !== ev.currentTarget.id);
    console.log(ev.currentTarget.id);
    setPlayers(filterPlayers);
  };

  const addPlayer = (ev) => {
    const newPlayer = {
      name: newPlayerName
    }
    ev.preventDefault();
    ApiPlayers(newPlayer).then((player) => {
      setPlayers([
        ...players,
        player.playerData
      ]
        );
    });


  };

  return (
    <div>
<Header/>
      <h2 className="title">Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <p>{player.name}</p>
            <button id={player.id} className="deletePlayer" onClick={deletePlayer}>
              ➖
            </button>
          </li>
        ))}
      </ul>

      <label htmlFor="NewPlayer">Añade una nueva jugadora:</label>
      <input
        value={newPlayerName}
        onChange={handleNewPlayer}
        type="text"
        id="NewPlayer"
        name="NewPlayer"
        placeholder="Ej: Falta"
      />

      <button className="addPlayer" onClick={addPlayer}>
        ➕
      </button>
      <Link className="quiz_link" to="/">
        Volver al incio X
      </Link>
    </div>
  );
};

export default PlayersPage;
