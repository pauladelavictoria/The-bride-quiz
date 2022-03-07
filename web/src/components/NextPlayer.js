const NextPlayer = (props) => {
    return props.players?.length > 0 ? (
      <div className="turn">
        <h2 className="turn_text">Turno de</h2>
        <p className="turn_player">{props.players?.[props.currentPlayer]?.name}</p>
      </div>
    ) : (
      ""
    );
  };

export default NextPlayer;