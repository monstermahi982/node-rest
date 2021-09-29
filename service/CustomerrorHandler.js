class CustomerrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static alreadyExists(message) {
        return new CustomerrorHandler(409, message);
    }
}

export default CustomerrorHandler;