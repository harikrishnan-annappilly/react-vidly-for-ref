import http from "./httpResponse";

const apiUrl = "http://127.0.0.1:5000";

export function getMovies() {
    return http.get(apiUrl + "/movies");
}

export function getMovie(movieId) {
    return http.get(apiUrl + "/movie/" + movieId);
}

export function deleteMovie(movieId) {
    return http.delete(apiUrl + "/movie/" + movieId);
}

export function saveMovie(movie) {
    const movieToBeSaved = { ...movie };
    delete movieToBeSaved.genre;
    delete movieToBeSaved._id;
    console.log("from saveMovie method", movieToBeSaved);
    if (movie._id) {
        console.log(
            "put request is being used",
            apiUrl + "/movie/" + movie._id
        );
        return http.put(apiUrl + "/movie/" + movie._id, movieToBeSaved);
    }
    return http.post(apiUrl + "/movies", movieToBeSaved);
}
