import axios from "axios";
// import logger from "./loggingService";

axios.interceptors.response.use(null, (error) => {
    if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    ) {
        return Promise.reject(error);
    }
    // toast.error("An unexpected error occured");
    // logger.log(error);
    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
