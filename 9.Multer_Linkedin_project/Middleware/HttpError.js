
import Http from "http"

class HttpError extends Error {

    constructor(message, statuscode = 500) {
        super(message)
        this.statuscode = statuscode;
    }
}

export default HttpError;