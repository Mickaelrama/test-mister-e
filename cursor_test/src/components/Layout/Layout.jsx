import { Link } from "react-router-dom";
import "./styles.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <div className="nav">
          <Link to="/">Acceuil</Link>
          <Link to="/about-us">Qui nous sommes</Link>
        </div>
      </header>
      <main>
        <div className="main-container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
