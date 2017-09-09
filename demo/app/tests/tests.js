var Payworks = require("nativescript-payworks").Payworks;
var payworks = new Payworks();

describe("greet function", function() {
    it("exists", function() {
        expect(payworks.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(payworks.greet()).toEqual("Hello, NS");
    });
});