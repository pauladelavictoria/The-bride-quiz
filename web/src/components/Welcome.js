import { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../images/logo-big.png";
import { createPlayer, getPlayers } from "../service/ApiPlayers";

const Welcome = ({ onLoginSuccess }) => {
  const [view, setView] = useState("create");
  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState("");
  const [groupCodeInput, setGroupCodeInput] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [matchingPlayers, setMatchingPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");

  const history = useHistory();

  const generateGroupCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateGroup = async (ev) => {
    ev.preventDefault();
    setError("");
    if (!groupName.trim()) {
      setError("Por favor, introduce el nombre de la despedida.");
      return;
    }

    setIsLoading(true);
    const code = generateGroupCode();

    const groupData = {
      name: groupName.trim(),
      groupCode: code,
      groupName: groupName.trim(),
      isGroup: true,
      isOrganizer: false
    };

    try {
      const response = await createPlayer(groupData);
      if (response.success) {
        setGeneratedCode(code);
        setShowSuccess(true);
      } else {
        setError("Error al crear el grupo en el servidor. Inténtalo de nuevo.");
      }
    } catch (e) {
      console.error(e);
      setError("Error de red al crear el grupo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToParticipants = () => {
    const organizerSession = {
      name: "Organizadora",
      email: "",
      groupCode: generatedCode,
      groupName: groupName.trim(),
      isOrganizer: true
    };
    onLoginSuccess(organizerSession, []);
    history.push("/playersPage");
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();
    setError("");
    setMatchingPlayers([]);

    if (!email.trim()) {
      setError("Por favor, introduce tu email.");
      return;
    }

    setIsLoading(true);
    const normalizedInputEmail = email.trim().toLowerCase();
    const normalizedGroupCode = groupCodeInput.trim().toUpperCase();

    try {
      const allPlayers = await getPlayers();

      let matches = allPlayers.filter(
        (player) =>
          !player.isGroup &&
          player.email &&
          player.email.trim().toLowerCase() === normalizedInputEmail
      );

      if (normalizedGroupCode) {
        matches = matches.filter(
          (player) => player.groupCode.trim().toUpperCase() === normalizedGroupCode
        );
      }

      if (matches.length === 0) {
        setError("El email no está registrado en ningún grupo activo. Contacta con la organizadora.");
      } else if (matches.length === 1) {
        onLoginSuccess(matches[0], allPlayers);
        history.push("/games");
      } else {
        setMatchingPlayers(matches);
        setSelectedPlayerId(matches[0].id);
      }
    } catch (e) {
      console.error(e);
      setError("Error al conectar con la base de datos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectGroupLogin = async (ev) => {
    ev.preventDefault();
    const selectedPlayer = matchingPlayers.find(p => p.id === selectedPlayerId);
    if (selectedPlayer) {
      setIsLoading(true);
      try {
        const allPlayers = await getPlayers();
        onLoginSuccess(selectedPlayer, allPlayers);
        history.push("/games");
      } catch (e) {
        setError("Error de conexión.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (showSuccess) {
    return (
      <div className="welcome">
        <img className="welcome_logo" src={Logo} alt="Logo The Bride Quiz" />
        <div className="welcome_container success-container">
          <h1 className="welcome_title success-title">¡Grupo Creado!</h1>
          <p className="welcome_subtitle">
            Se ha creado la despedida <strong>{groupName}</strong>. Comparte este código con las participantes para que puedan acceder:
          </p>
          <div className="welcome_code-display">
            {generatedCode}
          </div>
          <p className="welcome_code-instruction">
            Con este código y su correo electrónico podrán unirse al juego.
          </p>
          <button onClick={handleGoToParticipants} className="welcome_btn">
            Añadir participantes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome">
      <img className="welcome_logo" src={Logo} alt="Logo The Bride Quiz" />

      <div className="welcome_container">
        <div className="welcome_tabs">
          <button
            className={`welcome_tab-btn ${view === "create" ? "active" : ""}`}
            onClick={() => { setView("create"); setError(""); }}
          >
            Crear Despedida
          </button>
          <button
            className={`welcome_tab-btn ${view === "login" ? "active" : ""}`}
            onClick={() => { setView("login"); setError(""); }}
          >
            Entrar a Juego
          </button>
        </div>

        {view === "create" ? (
          <div>
            <h1 className="welcome_title">¿Organizas una Despedida?</h1>
            <p className="welcome_subtitle">
              Crea un espacio exclusivo para tu grupo y empieza a jugar.
            </p>

            <form className="welcome_form" onSubmit={handleCreateGroup}>
              <label htmlFor="groupName" className="welcome_label">Nombre de la Despedida:</label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                className="welcome_input"
                placeholder="Ej: Despedida de Laura 2026"
                value={groupName}
                onChange={(e) => { setGroupName(e.target.value); setError(""); }}
                disabled={isLoading}
              />
              {error && <p className="welcome_error">{error}</p>}
              <button type="submit" className="welcome_btn" disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear Grupo"}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="welcome_title">Entrar al Juego</h1>
            <p className="welcome_subtitle">
              Ingresa los datos para acceder a la despedida de tu grupo.
            </p>

            {matchingPlayers.length > 0 ? (
              <form className="welcome_form" onSubmit={handleSelectGroupLogin}>
                <label htmlFor="groupSelect" className="welcome_label">Elige tu despedida:</label>
                <select
                  id="groupSelect"
                  className="welcome_input welcome_select"
                  value={selectedPlayerId}
                  onChange={(e) => setSelectedPlayerId(e.target.value)}
                  disabled={isLoading}
                >
                  {matchingPlayers.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.groupName} ({player.groupCode}) - {player.name}
                    </option>
                  ))}
                </select>
                <button type="submit" className="welcome_btn" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar al Juego"}
                </button>
              </form>
            ) : (
              <form className="welcome_form" onSubmit={handleLogin}>
                <label htmlFor="email" className="welcome_label">Tu Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="welcome_input"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  disabled={isLoading}
                />

                <label htmlFor="groupCodeInput" className="welcome_label">Código de la Despedida (opcional):</label>
                <input
                  type="text"
                  id="groupCodeInput"
                  name="groupCodeInput"
                  className="welcome_input"
                  placeholder="Ej: LAU912"
                  value={groupCodeInput}
                  onChange={(e) => { setGroupCodeInput(e.target.value); setError(""); }}
                  disabled={isLoading}
                  maxLength={6}
                />
                {error && <p className="welcome_error">{error}</p>}
                <button type="submit" className="welcome_btn" disabled={isLoading}>
                  {isLoading ? "Comprobando..." : "Entrar"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
