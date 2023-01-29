import React from "react";
import Joi from "joi-browser";
import { getGenres } from "../services/flaskGenreService";
import { getMovie, saveMovie } from "../services/flaskMovieService";
import Form from "./common/form";

class MovieForm extends Form {
    state = {
        data: {
            _id: "",
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: "",
        },
        errors: {},
        genres: [],
    };

    schema = {
        _id: Joi.label("ID"),
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().integer().required(),
        dailyRentalRate: Joi.number().required(),
    };

    mapToViewModel = (movie) => {
        const data = { ...this.state.data };
        data._id = movie._id;
        data.title = movie.title;
        data.genreId = movie.genre._id.toString();
        data.numberInStock = movie.numberInStock;
        data.dailyRentalRate = movie.dailyRentalRate;
        this.setState({ data });
    };

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovies() {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === "new") return;
            const { data: movie } = await getMovie(movieId);
            this.mapToViewModel(movie);
        } catch (error) {
            if (error.response && error.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        this.populateGenres();
        this.populateMovies();
    }

    doSubmit = async () => {
        try {
            await saveMovie(this.state.data);
        } catch (error) {}
        this.props.history.push("/movies");
    };

    render() {
        const genres = this.state.genres.map((g) => ({
            value: g._id,
            label: g.name,
        }));

        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                {this.renderInput("title", "Movie Name")}
                {this.renderSelect("genreId", "Genre", genres)}
                {this.renderInput("numberInStock", "Stock")}
                {this.renderInput("dailyRentalRate", "Rate")}
                {this.renderButton("Submit")}
            </form>
        );
    }
}

export default MovieForm;
