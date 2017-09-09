import {Common} from './payworks.common';

export class Payworks extends Common {
    public doStartTransaction(amount: number, currency : string, subject: string, customIdentifier: string) {
        console.log("pay ios");
    }
}
