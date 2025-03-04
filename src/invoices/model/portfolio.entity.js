import {Invoice} from "./invoice.entity.js";

export class Portfolio {
    constructor({
        id  = '',
        userId = '',
        name = '',
        discountDate = new Date(),
        description = ''
    }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.discountDate = discountDate;
        this.description = description;
    }
}