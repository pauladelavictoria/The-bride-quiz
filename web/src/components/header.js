import { Link } from 'react-router-dom';
import logoHeader from '../images/logo-small.png';
import home from '../images/home.png'
const Header = () => {
  return (
    <section className="header">
      <img
        className="logo"
        src={logoHeader}
        alt="Logo The Bride Quiz"
      />
      <Link to="/card">
        <button className="backBtn">  <img
        className="BackBtn_img"
        src={home}
        alt="Volver atrás"
      /></button>
      </Link>
    </section>
  );
};
export default Header;