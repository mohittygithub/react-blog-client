import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { PATHS } from "../../utils/api";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userReducer = useSelector((state) => state.userReducer);
  const { loginInfo } = userReducer;
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("loginInfo");
    setIsLoggedIn(false);
    history.push(PATHS.HOME);
  };

  useEffect(() => {
    console.log("run");
    localStorage.getItem("loginInfo") && setIsLoggedIn(true);
  }, [loginInfo]);

  return (
    <div>
      <nav className="mb-1 navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to={PATHS.HOME}>
            REACT-BLOGS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-333"
            aria-controls="navbarSupportedContent-333"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-333"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={PATHS.HOME}>
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Pricing
                </Link>
              </li>
            </ul>
            {isLoggedIn ? (
              <>
                <ul className="navbar-nav ml-auto nav-flex-icons">
                  <li className="nav-item">
                    <Link className="nav-link waves-effect waves-light">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link waves-effect waves-light">
                      <i className="fab fa-google-plus-g"></i>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link waves-effect waves-light">
                      <i className="fab fa-google-plus-g"></i>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink-333"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i
                        className="fas fa-user"
                        style={{ color: "lightgreen" }}
                      ></i>
                    </Link>
                    <div
                      className="dropdown-menu dropdown-menu-right dropdown-default"
                      aria-labelledby="navbarDropdownMenuLink-333"
                    >
                      <span
                        style={{ cursor: "pointer" }}
                        className="dropdown-item"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </span>
                    </div>
                  </li>
                </ul>{" "}
              </>
            ) : (
              <ul className="navbar-nav ml-auto nav-flex-icons">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink-333"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user" style={{ color: "red" }}></i>
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right dropdown-default"
                    aria-labelledby="navbarDropdownMenuLink-333"
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => history.push(PATHS.LOGIN)}
                    >
                      Login
                    </span>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
