export class Invoice {
    constructor({
        id = '',
        ruc = '',
        business= '',
        amount = 0,
        coin = '',
        emissionDate = '',
        expirationDate = new Date(),
        discountRate = 0,
        rateType = '',

        comission = 0,
        printing = 0,
        shipping = 0,
        adminSpends = 0,
        secure = 0,
        retention = 0,

        finalAmount = 0,
        tcea = 0,
        total = 0,
        portfolioId = ''
    }) {
        this.id = id;
        this.ruc = ruc; // Proporcionado
        this.business = business; // Proporcionado
        this.amount = amount; // Proporcionado
        this.coin = coin; // Proporcionado
        this.emissionDate = emissionDate; // Proporcionado
        this.expirationDate = expirationDate; // Proporcionado
        this.rateType = rateType; // Proporcionado

        this.comission = comission; // Proporcionado
        this.printing = printing; // Proporcionado
        this.shipping = shipping; // Proporcionado
        this.adminSpends = adminSpends; // Proporcionado
        this.secure = secure; // Proporcionado
        this.retention = retention; // Proporcionado

        this.discountRate = discountRate; // Calculado
        this.finalAmount = finalAmount; // Calculado
        this.tcea = tcea; // Calculado
        this.total = total; // Calculado
        this.portfolioId = portfolioId;
    }
}