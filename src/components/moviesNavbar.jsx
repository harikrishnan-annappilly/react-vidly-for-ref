import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
                Vidly
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/movies">
                            Movies
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">
                            Customers
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/rentals">
                            Rentals
                        </NavLink>
                    </li>
                    {!props.user && (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">
                                    Register
                                </NavLink>
                            </li>
                        </React.Fragment>
                    )}

                    {props.user && (
                        <React.Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    {props.user.username[0].toUpperCase() +
                                        props.user.username.slice(1)}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">
                                    Log out
                                </NavLink>
                            </li>
                        </React.Fragment>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
