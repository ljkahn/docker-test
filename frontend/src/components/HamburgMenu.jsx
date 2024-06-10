import React, { useState } from "react";
import { Link } from "react-router-dom";

const HamburgMenu = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <button onClick={toggleMenu}>☰</button>
      {isOpen && (
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={() => {
                  onLogout();
                  toggleMenu();
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleMenu}>
                  Create an Account
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default HamburgMenu;
