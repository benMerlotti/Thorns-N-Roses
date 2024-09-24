import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/nurseries">
          Nurseries
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/distributors">
          Distributors
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/retailers">
          Retailers
        </Link>
      </li>
    </ul>
  );
};
