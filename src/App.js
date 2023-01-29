import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/moviesNavbar";
import MovieForm from "./components/movieForm";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import "./App.css";
import ProtectedComponent from "./components/common/protectedRoute";

class App extends Component {
    state = {};

    componentDidMount() {
        try {
            const jwt = localStorage.getItem("access_token");
            const user = jwtDecode(jwt);
            this.setState({ user });
        } catch (error) {}
    }

    render() {
        return (
            <React.Fragment>
                <NavBar user={this.state.user} />
                <main className="container">
                    <Switch>
                        <Route path={"/login"} component={Login} />
                        <Route path={"/logout"} component={Logout} />
                        <Route path={"/register"} component={Register} />
                        <ProtectedComponent
                            path="/movies/:id"
                            component={MovieForm}
                        />
                        <Route
                            path={"/movies"}
                            render={(props) => (
                                <Movies {...props} user={this.state.user} />
                            )}
                        />
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
}

export default App;
