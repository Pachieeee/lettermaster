export class Portfolio {
    constructor({
        id  = '',
        userId = '',
        name = '',
        discountDate = new Date(),
        compensatoryRate = 0,
        description = ''
    }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.discountDate = discountDate;
        this.compensatoryRate = compensatoryRate;
        this.description = description;
    }
}