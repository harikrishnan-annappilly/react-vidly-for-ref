import React from "react";

const MovieForm = (props) => {
    return (
        <div>
            <h1>Movie Form - Id: {props.match.params.id}</h1>
            <button className="btn btn-primary btn-sm">Save</button>
        </div>
    );
};

export default MovieForm;
