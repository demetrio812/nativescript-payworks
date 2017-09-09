import {Common, Currency, ProviderMode, TransactionCallback, ActionRequestCode, ActionResultCode} from './payworks.common';

export {Currency, ProviderMode, TransactionCallback, ActionRequestCode, ActionResultCode}

export class Payworks extends Common {
    protected doStartTransaction(amount: number, currency: Currency, subject: string, customIdentifier: string) {
        console.log("pay ios");
    }
}
