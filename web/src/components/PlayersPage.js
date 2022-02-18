import { useState } from "react";
import { Link } from "react-router-dom";


const PlayersPage = () => {
  // Variables estado
  const [players, setPlayers] = useState([{ name: "Juanca", id: "1" }]);
  const [newPlayerName, setNewPlayerName] = useState("");

  console.log(players);
  // Render new inputs

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

  // Añadir jugadora
  // const addPlayer = () => {
  //   setPlayers([...players, {name: newPlayerName, id: new Date().toISOString()}]);
  //   setNewPlayerName("");
  // };

//   const addPlayer = () => {
// const newPlayer = {
//   name: name,
//   uuid: uuid
// }

// fetch('http://localhost:4000/playersPage',{
//         method: 'POST',
//         body: JSON.stringify(newPlayer),
//         headers: {'content-Type': "application/json"}
//     })
//     .then(response => response.json())
//     .then((data) => {
//         return data;
//     });
  

  return (
    <div>
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

      {/* <button className="addPlayer" onClick={addPlayer}>
        ➕
      </button> */}
      <Link className="quiz_link" to="/">
        Volver al incio X
      </Link>
    </div>
  );
};

export default PlayersPage;
