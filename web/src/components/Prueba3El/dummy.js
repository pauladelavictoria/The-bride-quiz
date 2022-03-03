const Dummy = (props) => {
    return (
      <section className={`error-${props.numberOfErrors}`}>
        <span className="error-5"></span>
        <span className="error-4"></span>
        <span className="error-3"></span>
        <span className="error-2"></span>
        <span className="error-1"></span>
      </section>
    );
  };
  
  export default Dummy;