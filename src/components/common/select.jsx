import React from "react";

const Select = ({ name, label, items, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">{label}</label>
            <select className="form-control" id={name} name={name} {...rest}>
                <option value="">---</option>
                {items.map((i) => (
                    <option key={i.value} value={i.value}>
                        {i.label}
                    </option>
                ))}
            </select>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Select;
