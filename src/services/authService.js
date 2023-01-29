import http from "./httpResponse";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiUrl = config.apiUrl;

export async function login(username, password) {
    const userObject = { username, password };
    const { data: result } = await http.post(apiUrl + "/login", userObject);
    const access_token = result["access_token"];
    localStorage.setItem("access_token", access_token);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem("access_token");
        const user = jwtDecode(jwt);
        return user;
    } catch (error) {}
    return null;
}

export default {
    login: login,
    getCurrentUser: getCurrentUser,
};
