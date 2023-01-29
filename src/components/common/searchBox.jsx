import React from "react";

const SearchBox = ({ value, onChange }) => {
    return (
        <form>
            <div className="form-group">
                <input
                    className="form-control"
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                />
            </div>
        </form>
    );
};

export default SearchBox;
