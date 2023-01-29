import React from "react";

const Input = ({ name, label, error, type = "text", ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor="">{label}</label>
            <input
                className="form-control"
                id={name}
                name={name}
                type={type}
                {...rest}
            />
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Input;
