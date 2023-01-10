import axios from "axios";

export const errorHandler = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
        return 400;
    }
    const { request, response } = error;
    if (response) {
        return response.status;
    } else if (request) {
        return 503;
    } else {
        return 400;
    }
};