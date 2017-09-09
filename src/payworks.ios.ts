import {Common, Currency, ProviderMode} from './payworks.common';

export {Currency, ProviderMode}

export class Payworks extends Common {
    public doStartTransaction(amount: number, currency: Currency, subject: string, customIdentifier: string) {
        console.log("pay ios");
    }
}
