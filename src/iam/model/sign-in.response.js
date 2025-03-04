/**
 * Sign in response model
 * @summary
 * This model is used to create a sign in response object
 */
export class SignInResponse {
    /**
     * Constructor
     * @param id The user id
     * @param username The username
     * @param password The password
     */
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}