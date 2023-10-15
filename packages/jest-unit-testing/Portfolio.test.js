import Portfolio from './Portfolio';

test('isEmpty() returns true with 0 stocks', () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toBeTruthy()
});


test('isEmpty() returns false with > 1 stock', () => {
    const portfolio = new Portfolio();
    portfolio.stocks.set("GME", 10);
    expect(portfolio.isEmpty()).toBeFalsy()
});

test('numUniqueStocks() with 0 stocks', () => {
    const portfolio = new Portfolio();
    expect(portfolio.numUniqueStocks()).toBe(0);
});

test('numUniqueStocks() with 1 stock', () => {
    const portfolio = new Portfolio();
    portfolio.stocks.set("GME", 10);
    expect(portfolio.numUniqueStocks()).toBe(1);
});

test('numUniqueStocks() with multiple stocks', () => {
    const portfolio = new Portfolio();
    portfolio.stocks.set("GME", 10);
    portfolio.stocks.set("SBUX", 7);
    portfolio.stocks.set("SBUX", 5);
    expect(portfolio.numUniqueStocks()).toBe(2);
});

test('purchase() a new stock', () => {
    const portfolio = new Portfolio();
    portfolio.purchase("GME", 8);
    expect(portfolio.checkHolding("GME")).toBe(8);
});

test('purchase() one stock multiple times', () => {
    const portfolio = new Portfolio();
    portfolio.purchase("GME", 8);
    portfolio.purchase("GME", 3);
    expect(portfolio.checkHolding("GME")).toBe(11);
});

test('purchase() multiple stocks multiple times', () => {
    const portfolio = new Portfolio();
    portfolio.purchase("GME", 2);
    portfolio.purchase("SBUX", 8);
    portfolio.purchase("GME", 3);
    portfolio.purchase("SBUX", 0.5);

    expect(portfolio.checkHolding("GME")).toBe(5);
    expect(portfolio.checkHolding("SBUX")).toBe(8.5);
});8

test('sell() a stock that exists', () => {
    const portfolio = new Portfolio();
    portfolio.purchase("GME", 2);
    portfolio.sell("GME", 1);
    expect(portfolio.checkHolding("GME")).toBe(1);
});

test("sell() a stock that doesn't exist", () => {
    const portfolio = new Portfolio();
    expect(() => portfolio.sell("GME", 1)).toThrow("Stock does not exist");
});

test("sell() more of a stock than is available", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("GME", 1);
    expect(() => portfolio.sell("GME", 2)).toThrow("ShareSaleException");
});

test("sell() all of a stock deletes it from the portfolio", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("GME", 1);
    portfolio.sell("GME", 1);
    expect(portfolio.isEmpty()).toBeTruthy();
});

test("checkHolding() for a stock that exists", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("GME", 1);
    expect(portfolio.checkHolding("GME")).toBe(1);
});

test("checkHolding() for a stock that does not exist", () => {
    const portfolio = new Portfolio();
    portfolio.purchase("GME", 1);
    expect(() => portfolio.checkHolding("SBUX")).toThrow("Stock does not exist");
});