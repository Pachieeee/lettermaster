import http from "../../shared/services/http-common.js";

export class InvoiceService {
    resourceEndpoint = '/invoices'

    getAll() {
        return http.get(this.resourceEndpoint)
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`)
    }

    create(invoiceResource) {
        return http.post(this.resourceEndpoint, invoiceResource)
    }

    update(id, invoiceResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, invoiceResource)
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`)
    }

    getByPortfolioId(portfolioId) {
        return http.get(`${this.resourceEndpoint}?portfolioId=${portfolioId}`)
    }
}