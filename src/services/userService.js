import http from "./httpResponse";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/user";

export function register(username, password) {
    const userObject = { username, password };
    return http.post(apiEndpoint, userObject);
}
