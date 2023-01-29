import http from "./httpResponse";
import config from "../config.json";

const apiEndpoint = config.apiUrl;

export function getMovies() {
    return http.get(apiEndpoint + "/movies");
}

export function getMovie(movieId) {
    return http.get(apiEndpoint + "/movie/" + movieId);
}

export function deleteMovie(movieId) {
    return http.delete(apiEndpoint + "/movie/" + movieId);
}

export function saveMovie(movie) {
    const movieToBeSaved = { ...movie };
    delete movieToBeSaved.genre;
    delete movieToBeSaved._id;
    if (movie._id) {
        return http.put(apiEndpoint + "/movie/" + movie._id, movieToBeSaved);
    }
    return http.post(apiEndpoint + "/movies", movieToBeSaved);
}
