const SolutionLetters = (props) => {
  // Función para letras acertadas
  const renderSolutionLetters = () => {
    const wordLetters = props.word?.split("");
    return wordLetters?.map((wordLetter, index) => {
      return props.userLetters.includes(wordLetter) ? (
        <li id={index} key={index} className="letter">
          {wordLetter}
        </li>
      ) : (
        <li id={index} key={index} className="letter"></li>
      );
    });
  };
  return (
    <div className="solution">
      <ul className="letters">
        {renderSolutionLetters()}
      </ul>
    </div>
  )
}

export default SolutionLetters;