import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    schema = {};

    validate = () => {
        const { data } = this.state;
        const options = { abortEarly: false };
        const results = Joi.validate(data, this.schema, options).error;
        const errors = {};
        if (results) {
            results.details.map((r) => (errors[r.path[0]] = r.message));
            console.log(errors);
            return errors;
        }
        return null;
    };

    validateProperty = (input) => {
        const errors = { [input.name]: input.value };
        const schema = { [input.name]: this.schema[input.name] };
        const result = Joi.validate(errors, schema);
        if (!result.error) return "";
        return result.error.details[0].message;
    };

    handleChange = ({ currentTarget: input }) => {
        const { data } = this.state;
        data[input.name] = input.value;
        const errorMessage = this.validateProperty(input);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        this.setState({ data, errors });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    renderInput = (name, label, type) => {
        const { data, errors } = this.state;
        return (
            <Input
                label={label}
                name={name}
                id={name}
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };

    renderSelect = (name, label, items) => {
        const { data, errors } = this.state;
        return (
            <Select
                name={name}
                label={label}
                items={items}
                onChange={this.handleChange}
                value={data[name]}
                error={errors[name]}
            />
        );
    };

    renderButton = (label) => {
        return (
            <button
                type="submit"
                className="btn btn-primary"
                disabled={this.validate()}
            >
                {label}
            </button>
        );
    };
}

export default Form;
