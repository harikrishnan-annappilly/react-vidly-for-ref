import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Pagination from "./common/pagination";
import Paginate from "./utils/paginate";
import ListGroup from "./common/list-group";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
    };

    componentDidMount() {
        this.setState({
            genres: [{ name: "All" }, ...getGenres()],
            movies: getMovies(),
        });
    }

    handleDeleteMovie = (movie) => {
        deleteMovie(movie._id);
        this.setState({ movies: getMovies() });
    };

    handleLikeClick = (movie) => {
        const movies = [...this.state.movies];
        const movieIndex = movies.indexOf(movie);
        movie = { ...movies[movieIndex] };
        movie.liked = !movie.liked;
        movies[movieIndex] = movie;
        this.setState({ movies });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSelectGenre = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getMovieDataToRender = () => {
        let { length: count } = this.state.movies;
        let { selectedGenre } = this.state;
        const filterdMovies =
            selectedGenre && selectedGenre._id
                ? this.state.movies.filter((movie) => {
                      return movie.genre._id === selectedGenre._id;
                  })
                : this.state.movies;
        const sortedMovies = _.orderBy(
            filterdMovies,
            [this.state.sortColumn.path],
            [this.state.sortColumn.order]
        );
        const movies = Paginate(
            sortedMovies,
            this.state.currentPage,
            this.state.pageSize
        );
        return { totalCount: filterdMovies.length, data: movies };
    };

    render() {
        const result = this.getMovieDataToRender();
        if (result.totalCount === 0)
            return <p>There are no movies in database.</p>;
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        onSelectGenre={this.handleSelectGenre}
                        selectedGenre={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                    <p>Showing {result.totalCount} movies in the database.</p>
                    <MoviesTable
                        movies={result.data}
                        onLike={this.handleLikeClick}
                        onDelete={this.handleDeleteMovie}
                        onSort={this.handleSort}
                        sortColumn={this.state.sortColumn}
                    />
                    <Pagination
                        itemsCount={result.totalCount}
                        currentPage={this.state.currentPage}
                        pageSize={this.state.pageSize}
                        pageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;
