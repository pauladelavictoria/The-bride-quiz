import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import {createPlayer, deletePlayer, getPlayers} from '../service/ApiPlayers';


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
      setPlayers(response)
    })
    }, []);


  // Eliminar jugadora
  const handleDeletePlayer = (ev) => {
    deletePlayer({id: ev.currentTarget.id}).then((response) => {
      setPlayers(players.filter((player) => {
        return player.id !== response.id
      }));
    });
  };

  const addPlayer = (ev) => {
    const newPlayer = {
      name: newPlayerName
    }
    ev.preventDefault();
    createPlayer(newPlayer).then((player) => {
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
            <button id={player.id} className="deletePlayer" onClick={handleDeletePlayer}>
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
