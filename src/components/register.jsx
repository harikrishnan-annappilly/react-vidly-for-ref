import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

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

    doSubmit = () => {
        console.log("register", this.state.data);
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
