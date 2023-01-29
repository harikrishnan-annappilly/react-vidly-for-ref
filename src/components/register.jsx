import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "./../services/userService";

class Register extends Form {
    state = {
        data: {
            email: "",
            password: "",
            name: "",
        },
        errors: {},
    };

    schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3),
        name: Joi.string().required(),
    };

    doSubmit = async () => {
        const { email, password } = this.state.data;
        try {
            await register(email, password);
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.email = error.response.data.message;
                this.setState({ errors });
            }
        }
    };
    render() {
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderInput("name", "Name")}
                {this.renderButton("Submit")}
            </form>
        );
    }
}

export default Register;
