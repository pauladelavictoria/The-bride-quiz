import { useState } from "react";
// COMPONENTES
import Header from "./Header";

const Instructions = () => {
  // Mostrar instrucciones

  const [showInstruction, setShowInstruction] = useState(undefined);
  const renderInstruction = (ev) => {
    setShowInstruction(ev.currentTarget.id !== showInstruction ? ev.currentTarget.id : undefined);
  };

  return (
    <div className="instructions">
      <Header />
      <p className="instructions_text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dicta illo
        amet, sed fugiat obcaecati labore omnis beatae quisquam optio dolor
        saepe, architecto non illum maxime exercitationem nemo officiis esse!
      </p>
      <button id="1" onClick={renderInstruction} className="instructions_btn">
        Juego de la ahogada
      </button>
      {showInstruction === "1" && (
        <p className="instructions_text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti aut
          eos, modi eius fuga ea hic. Reprehenderit, consectetur saepe possimus
          iste dignissimos enim, accusamus dolor dicta corporis, similique ea
          inventore?
        </p>
      )}
      <button id="2" onClick={renderInstruction} className="instructions_btn">
        ¿Cuánto sabes sobre bodas?
      </button>
      {showInstruction === "2" && (
        <p className="instructions_text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti aut
          eos, modi eius fuga ea hic. Reprehenderit, consectetur saepe possimus
          iste dignissimos enim, accusamus dolor dicta corporis, similique ea
          inventore?
        </p>
      )}
      <button id="3" onClick={renderInstruction} className="instructions_btn">
        Verdad o Atrevimiento
      </button>
      {showInstruction === "3" && (
        <p className="instructions_text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti aut
          eos, modi eius fuga ea hic. Reprehenderit, consectetur saepe possimus
          iste dignissimos enim, accusamus dolor dicta corporis, similique ea
          inventore?
        </p>
      )}
    </div>
  );
};

export default Instructions;
