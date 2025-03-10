class ApiError extends Error {
    public statusCode: number;
    public data: any; // Specify a more specific type if you know the structure
    public success: boolean;
    public errors: string[];
    
    constructor(
        statusCode: number,
        message = "Something went wrong",
        errors: string[] = [],
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
