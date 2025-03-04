import http from "../../shared/services/http-common.js";

export class PortfolioService {
    resourceEndpoint = '/portfolios'

    getAll() {
        return http.get(this.resourceEndpoint)
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`)
    }

    create(portfolioResource) {
        return http.post(this.resourceEndpoint, portfolioResource)
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`)
    }

    getByUserId(userId) {
        return http.get(`${this.resourceEndpoint}?userId=${userId}`)
    }
}