
const SolutionLetters = (props) => {
    return (
<div className="solution">            
            <ul className="letters">
            {props.renderSolutionLetters()}
            </ul>
          </div>
)}

export default SolutionLetters;