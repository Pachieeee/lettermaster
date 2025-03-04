export class Invoice {
    constructor({
        id = '',
        ruc = '',
        business= '',
        amount = 0,
        coin = '',
        emissionDate = new Date(),
        expirationDate = new Date(),
        discountDate = new Date(),
        discountRate = 0,
        rateType = '',
        rate = 0,
        taxRelief = 0,
        studyFee = 0,
        activationFee = 0,
        retention = 0,
        shipping = 0,
        finalAmount = 0,
        portfolioId = ''
    }) {
        this.id = id;
        this.ruc = ruc; //RUC+
        this.business = business; //Razon social+
        this.amount = amount; //Valor nominal+
        this.coin = coin; //Tipo de moneda+
        this.emissionDate = emissionDate; //Fecha de inicio+
        this.expirationDate = expirationDate; //Fecha de vencimiento+
        this.discountDate = discountDate; //Fecha de descuento+
        this.discountRate = discountRate; //Tasa de descuento+
        this.rateType = rateType; //Tipo de tasa (efectiva o nominal)+
        this.rate = rate; //Valor de la tasa+
        this.taxRelief = taxRelief;
        this.studyFee = studyFee;
        this.activationFee = activationFee;
        this.retention = retention;
        this.shipping = shipping;
        this.finalAmount = finalAmount;
        this.portfolioId = portfolioId;
    }
}