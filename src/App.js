import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/moviesNavbar";
import MovieForm from "./components/movieForm";
import Login from "./components/login";
import Register from "./components/register";
import "./App.css";

function App() {
    return (
        <React.Fragment>
            <NavBar />
            <main className="container">
                <Switch>
                    <Route path={"/login"} component={Login} />
                    <Route path={"/register"} component={Register} />
                    <Route path="/movies/:id" component={MovieForm} />
                    <Route path={"/movies"} component={Movies} />
                    <Route path={"/customers"} component={Customers} />
                    <Route path={"/rentals"} component={Rentals} />
                    <Route path={"/not-found"} component={NotFound} />
                    <Redirect from="/" exact to="/movies" />
                    <Redirect to="/not-found" />
                </Switch>
            </main>
        </React.Fragment>
    );
}

export default App;
