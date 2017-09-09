import {Observable} from 'tns-core-modules/data/observable';
import {Payworks, ProviderMode, Currency} from 'nativescript-payworks';

export class HelloWorldModel extends Observable {
    private payworks: Payworks;

    constructor() {
        super();

        this.payworks = new Payworks();
        this.payworks.setup(ProviderMode.TEST, "<merchantIdentifier>", "<merchantSecret>");
    }

    payNow() {
        this.payworks.startTransaction(40.00, Currency.EUR, "Test transaction", "Custom identifier");
    }
}
