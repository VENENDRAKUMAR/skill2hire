// ...existing code...
class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message); // must call super before using `this`
        this.statusCode = statusCode;
        this.errors = errors;
        this.name = this.constructor.name;

        if (stack) {
            this.stack = stack;
        } else {
            // populate stack trace in Node.js
            if (typeof Error.captureStackTrace === "function") {
                Error.captureStackTrace(this, this.constructor);
            }
        }
    }
}

export { ApiError };
// ...existing code...