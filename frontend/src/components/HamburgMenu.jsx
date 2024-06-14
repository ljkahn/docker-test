import React from "react";
import { Link } from "react-router-dom";

const HamburgMenu = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      {isAuthenticated ? (
        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </nav>
  );
};

export default HamburgMenu;
