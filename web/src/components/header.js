import { Link } from 'react-router-dom';
import logoHeader from '../images/logo-small.png';
import home from '../images/home.png'
const Header = () => {
  return (
    <section className="header">
      <img
        className="header_logo"
        src={logoHeader}
        alt="Logo The Bride Quiz"
      />
      <Link to="/games">
        <button className="header_backBtn">  <img
        className="header_backBtn-img"
        src={home}
        alt="Volver atrás"
      /></button>
      </Link>
    </section>
  );
};
export default Header;