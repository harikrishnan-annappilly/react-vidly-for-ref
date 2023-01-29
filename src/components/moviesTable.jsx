import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import authService from "../services/authService";

class MoviesTable extends Component {
    state = {
        columns: [
            {
                path: "title",
                label: "Title",
                content: (movie) => (
                    <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                ),
            },
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
        ],
    };

    constructor() {
        super();
        const user = authService.getCurrentUser();
        console.log(user);
        if (user) {
            this.state.columns.push({
                key: "delete",
                content: (movie) => (
                    <button
                        onClick={() => this.props.onDelete(movie)}
                        className="btn btn-danger btn-sm"
                        disabled={!user.isAdmin}
                    >
                        Delete
                    </button>
                ),
            });
        }
    }

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
