import {Observable} from 'tns-core-modules/data/observable';
import {Payworks, ProviderMode, Currency} from 'nativescript-payworks';
import {ActionRequestCode, ActionResultCode, TransactionCallback} from "../../src/payworks.common";

export class HelloWorldModel extends Observable implements TransactionCallback {

    onPaymentApproved(transaction: any): void {
        console.log("Payment approved");
    }

    onPaymentDeclined(transaction: any): void {
        console.log("Payment declined");
    }

    private payworks: Payworks;

    constructor() {
        super();

        this.payworks = new Payworks();
        this.payworks.setup(ProviderMode.TEST, "2061ea67-20a4-41f8-a1b3-bf5527d249cd", "JQtF5vTf0DhK1V51M0E75JFS1bO2EBaa", this);
    }

    payNow() {
        console.log("payNow");
        this.payworks.startTransaction(40.00, Currency.EUR, "Test transaction", "Custom identifier");
    }
}
