import React, { Component } from "react";
import {
    getMovies,
    deleteMovie,
    saveMovie,
    getMovie,
} from "../services/flaskMovieService";
import { getGenres } from "../services/flaskGenreService";
// import { getGenres } from "../services/fakeGenreService";

import Pagination from "./common/pagination";
import Paginate from "./utils/paginate";
import ListGroup from "./common/list-group";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: {},
        searchQuery: "",
        sortColumn: {},
    };

    async componentDidMount() {
        const defaultGenre = { name: "All", _id: "" };
        const defaultSortColumn = { path: "title", order: "asc" };
        const { data: genres } = await getGenres();
        const { data: movies } = await getMovies();

        this.setState({
            selectedGenre: defaultGenre,
            sortColumn: defaultSortColumn,
            genres: [defaultGenre, ...genres],
            movies: [...movies],
        });
    }

    handleDeleteMovie = async (movie) => {
        const originalMovies = this.state.movies;
        try {
            const movies = originalMovies.filter((m) => m._id !== movie._id);
            this.setState({ movies });
            await deleteMovie(movie._id);
        } catch (error) {
            console.log({ error });
            this.setState({ movies: originalMovies });
        }
    };

    handleLikeClick = async ({ _id: movieId }) => {
        const { data: movieFromList } = await getMovie(movieId);
        movieFromList.genreId = movieFromList.genre._id;
        movieFromList.liked = !movieFromList.liked;
        try {
            await saveMovie(movieFromList);
        } catch (error) {}

        const { data: movies } = await getMovies();
        this.setState({ movies });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSelectGenre = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1,
            searchQuery: "",
        });
    };

    handleSearchQueryChange = (query) => {
        this.setState({
            selectedGenre: null,
            currentPage: 1,
            searchQuery: query,
        });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getMovieDataToRender = () => {
        let { selectedGenre, searchQuery } = this.state;

        let filterdMovies = this.state.movies;

        if (searchQuery)
            filterdMovies = this.state.movies.filter((m) =>
                m.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        else if (selectedGenre && selectedGenre._id)
            filterdMovies = this.state.movies.filter((movie) => {
                return movie.genre._id === selectedGenre._id;
            });

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
        // if (result.totalCount === 0)
        // return <p>There are no movies in database.</p>;
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
                    <SearchBox
                        value={this.state.searchQuery}
                        onChange={this.handleSearchQueryChange}
                    ></SearchBox>
                    {this.props.user && (
                        <Link
                            className="btn btn-primary btn-sm my-3"
                            to="/movies/new"
                        >
                            Add New
                        </Link>
                    )}

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
