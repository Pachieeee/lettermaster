import http from "../../shared/services/http-common.js";

export class UserService {
    resourceEndpoint = '/users';

    create(userResource) {
        return http.post(this.resourceEndpoint, userResource);
    }

    getByUsername(username) {
        const encodedUsername = encodeURIComponent(username);
        return http.get(`${this.resourceEndpoint}?username=${username}`);
    }
}