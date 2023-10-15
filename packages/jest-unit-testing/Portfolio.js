export default class Portfolio {
    constructor() {
        this.stocks = new Map();
    }

    isEmpty() {
        return this.stocks.size == 0;
    }

    numUniqueStocks() {
        return this.stocks.size;
    }

    purchase(name, amount) {
        if (this.stocks.has(name)) {
            this.stocks.set(name, this.stocks.get(name) + amount);
        } else {
            this.stocks.set(name, amount);
        }
    }

    sell(name, amount) {

        if (!this.stocks.has(name)) {
            throw new Error("Stock does not exist");
            return
        }

        if (amount > this.stocks.get(name)) {
            throw new Error("ShareSaleException");
            return
        }

        if (amount == this.stocks.get(name)) {
            this.stocks.delete(name);
            return
        }

        this.stocks.set(name, this.stocks.get(name) - amount);
    }

    checkHolding(name) {

        if (!this.stocks.has(name)) {
            throw new Error("Stock does not exist");
            return
        }

        return this.stocks.get(name);
    }

}