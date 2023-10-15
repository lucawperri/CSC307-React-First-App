import Portfolio from './Portfolio';

test('isEmpty() returns true with 0 stocks', () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toBeTruthy()
});


test('isEmpty() returns false with > 1 stock', () => {
    const portfolio = new Portfolio();
    portfolio.stocks.set("TSLA", 1);
    expect(portfolio.isEmpty()).toBeFalsy()
});

test('numUniqueStocks() with 0 stocks', () => {
    const portfolio = new Portfolio();
    expect(portfolio.numUniqueStocks()).toBe(0);
});

test('numUniqueStocks() with 1 stock', () => {
    const portfolio = new Portfolio();
    portfolio.stocks.set("TSLA", 1);
    expect(portfolio.numUniqueStocks()).toBe(1);
});

test('numUniqueStocks() with multiple stocks', () => {
    const portfolio = new Portfolio();
    portfolio.stocks.set("TSLA", 1);
    portfolio.stocks.set("RBLX", 5);
    portfolio.stocks.set("RBLX", 6);
    expect(portfolio.numUniqueStocks()).toBe(2);
});

test('purchase() a new stock', () => {
    const portfolio = new Portfolio();
    portfolio.purchase("TSLA", 1);
    expect(portfolio.checkHolding("TSLA")).toBe(1);
});

test('purchase() one stock multiple times', () => {
    const portfolio = new Portfolio();
    portfolio.purchase("TSLA", 1);
    portfolio.purchase("TSLA", 3);
    expect(portfolio.checkHolding("TSLA")).toBe(4);
});

test('purchase() multiple stocks multiple times', () => {
    const portfolio = new Portfolio();
    portfolio.purchase("TSLA", 1);
    portfolio.purchase("RBLX", 10);
    portfolio.purchase("TSLA", 3);
    portfolio.purchase("RBLX", 0.5);

    expect(portfolio.checkHolding("TSLA")).toBe(4);
    expect(portfolio.checkHolding("RBLX")).toBe(10.5);
});

test('sell() a stock that exists', () => {
    const portfolio = new Portfolio();
    portfolio.purchase("TSLA", 2);
    portfolio.sell("TSLA", 1);
    expect(portfolio.checkHolding("TSLA")).toBe(1);
});

test("sell() a stock that doesn't exist", () => {
    const portfolio = new Portfolio();
    expect(() => portfolio.sell("TSLA", 1)).toThrow("Stock does not exist");
});

test("sell() more of a stock than is available", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("TSLA", 1);
    expect(() => portfolio.sell("TSLA", 2)).toThrow("ShareSaleException");
});

test("sell() all of a stock deletes it from the portfolio", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("TSLA", 1);
    portfolio.sell("TSLA", 1);
    expect(portfolio.isEmpty()).toBeTruthy();
});

test("checkHolding() for a stock that exists", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("TSLA", 1);
    expect(portfolio.checkHolding("TSLA")).toBe(1);
});

test("checkHolding() for a stock that does not exist", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("TSLA", 1);
    expect(() => portfolio.checkHolding("RBLX")).toThrow("Stock does not exist");
});