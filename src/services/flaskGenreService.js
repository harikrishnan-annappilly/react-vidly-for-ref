import http from "./httpResponse";

const apiUrl = "http://127.0.0.1:5000";

export function getGenres() {
    return http.get(apiUrl + "/genres");
}
