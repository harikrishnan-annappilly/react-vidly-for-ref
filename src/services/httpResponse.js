import axios from "axios";
import authService from "./authService";
import logger from "./loggingService";

axios.defaults.headers.delete["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

axios.interceptors.response.use(null, (error) => {
    if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    ) {
        return Promise.reject(error);
    }
    logger.log(error);
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
