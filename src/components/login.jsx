import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

import auth from "../services/authService";
import jwtDecode from "jwt-decode";
import authService from "../services/authService";
import { Redirect } from "react-router-dom";

class Login extends Form {
    state = {
        data: {
            username: "",
            password: "",
        },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    doSubmit = async () => {
        try {
            const { username, password } = this.state.data;
            await auth.login(username, password);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (error) {
            if (error?.response?.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = error.response.data.message;
                this.setState({ errors });
            }
        }
    };

    render() {
        if (authService.getCurrentUser()) {
            return <Redirect to="/" />;
        }
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Submit")}
            </form>
        );
    }
}

export default Login;
