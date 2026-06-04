import { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import { createPlayer, deletePlayer, updatePlayer } from "../service/ApiPlayers";

const PlayersPage = (props) => {
  const history = useHistory();
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerEmail, setNewPlayerEmail] = useState("");
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [editPlayerName, setEditPlayerName] = useState("");
  const [editPlayerEmail, setEditPlayerEmail] = useState("");

  const handleNewPlayerName = (ev) => setNewPlayerName(ev.currentTarget.value);
  const handleNewPlayerEmail = (ev) => setNewPlayerEmail(ev.currentTarget.value);

  const handleEditPlayerName = (ev) => setEditPlayerName(ev.currentTarget.value);
  const handleEditPlayerEmail = (ev) => setEditPlayerEmail(ev.currentTarget.value);

  const handleDeletePlayer = (ev) => {
    deletePlayer({ id: ev.currentTarget.id }).then((response) => {
      props.setPlayers(
        props.players.filter((player) => player.id !== response.id)
      );
    });
  };

  const addPlayer = (ev) => {
    ev.preventDefault();
    if (!newPlayerName.trim()) return;
    const newPlayer = {
      name: newPlayerName.trim(),
      email: newPlayerEmail.trim(),
      groupCode: props.authenticatedUser?.groupCode || "default",
      groupName: props.authenticatedUser?.groupName || "Default Group",
      isGroup: false,
      isOrganizer: false
    };
    createPlayer(newPlayer).then((player) => {
      if (player.success) {
        props.setPlayers([...props.players, player.playerData]);
        setNewPlayerName("");
        setNewPlayerEmail("");
      }
    });
  };

  const startEdit = (player) => {
    setEditingPlayerId(player.id);
    setEditPlayerName(player.name || "");
    setEditPlayerEmail(player.email || "");
  };

  const cancelEdit = () => {
    setEditingPlayerId(null);
  };

  const saveEdit = (id) => {
    const originalPlayer = props.players.find(p => p.id === id);
    const updatedPlayer = {
      id: id,
      name: editPlayerName.trim(),
      email: editPlayerEmail.trim(),
      groupCode: props.authenticatedUser?.groupCode || "default",
      groupName: props.authenticatedUser?.groupName || "Default Group",
      isGroup: false,
      isOrganizer: originalPlayer?.isOrganizer || false
    };
    updatePlayer(updatedPlayer).then((response) => {
      if (response.success) {
        props.setPlayers(
          props.players.map((p) => (p.id === id ? response.playerData : p))
        );
        setEditingPlayerId(null);
      }
    });
  };

  const groupName = props.authenticatedUser?.groupName || "Despedida";
  const groupCode = props.authenticatedUser?.groupCode || "";

  return (
    <div className="players">
      <Header />
      <div className="players_group-info">
        <h3 className="players_group-name">Despedida: {groupName}</h3>
        <p className="players_group-code">Código de acceso: <strong>{groupCode}</strong></p>
      </div>

      <h2 className="players_title">Participantes</h2>
      <ul className="players_list">
        {props.players.map((player) => (
          <li className="players_list-player" key={player.id}>
            {editingPlayerId === player.id ? (
              <div className="players_edit-container">
                <input
                  type="text"
                  value={editPlayerName}
                  onChange={handleEditPlayerName}
                  placeholder="Nombre"
                  className="players_addPlayer-input"
                />
                <input
                  type="email"
                  value={editPlayerEmail}
                  onChange={handleEditPlayerEmail}
                  placeholder="Email"
                  className="players_addPlayer-input"
                />
                <div className="players_edit-actions">
                  <button className="players_list-btn edit-btn" onClick={() => saveEdit(player.id)}>✔</button>
                  <button className="players_list-btn" onClick={cancelEdit}>X</button>
                </div>
              </div>
            ) : (
              <>
                <div className="players_list-info">
                  <p className="players_list-text">{player.name}</p>
                  {player.email && <p className="players_list-email">{player.email}</p>}
                </div>
                <div className="players_list-actions">
                  <button onClick={() => startEdit(player)} className="players_list-btn edit-btn">
                    ✎
                  </button>
                  <button
                    id={player.id}
                    className="players_list-btn"
                    onClick={handleDeletePlayer}
                  >
                    -
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="players_addPlayer">
        <label className="players_addPlayer-title">Añade una nueva participante:</label>
        <div className="players_addPlayer-container">
          <input
            className="players_addPlayer-input"
            value={newPlayerName}
            onChange={handleNewPlayerName}
            type="text"
            placeholder="Nombre"
          />
          <input
            className="players_addPlayer-input"
            value={newPlayerEmail}
            onChange={handleNewPlayerEmail}
            type="email"
            placeholder="Email (opcional)"
          />
          <button className="players_addPlayer-btn" onClick={addPlayer}>
            +
          </button>
        </div>
      </div>

      <div className="players_start-container">
        <button className="players_start-btn" onClick={() => history.push("/games")}>
          Comenzar Juego →
        </button>
      </div>
    </div>
  );
};

export default PlayersPage;
