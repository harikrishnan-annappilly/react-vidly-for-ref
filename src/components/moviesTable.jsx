import React, { Component } from "react";
import Like from "./common/like";
import TableHeaders from "./common/table-headers";
import TableBody from "./common/table-body";
import Table from "./common/table";

class MoviesTable extends Component {
    state = {
        columns: [
            { path: "title", label: "Title" },
            { path: "genre.name", label: "Genre" },
            { path: "numberInStock", label: "Stock" },
            { path: "dailyRentalRate", label: "Rate" },
            {
                key: "like",
                content: (movie) => (
                    <Like
                        liked={movie.liked}
                        onClick={() => this.props.onLike(movie)}
                    />
                ),
            },
            {
                key: "delete",
                content: (movie) => (
                    <button
                        onClick={() => this.props.onDelete(movie)}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                ),
            },
        ],
    };
    render() {
        const { movies, onLike, onSort, sortColumn } = this.props;
        return (
            <Table
                columns={this.state.columns}
                data={movies}
                onSort={onSort}
                sortColumn={sortColumn}
                onLike={onLike}
            />
        );
    }
}

export default MoviesTable;
