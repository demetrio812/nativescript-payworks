import {Observable} from 'tns-core-modules/data/observable';

export class Common extends Observable {
    protected inited = false;

    protected providerMode: ProviderMode;
    protected merchantIdentifier: string;
    protected merchantSecret: string;
    protected transactionCallback: TransactionCallback = null;

    constructor() {
        super();
        this.providerMode = ProviderMode.UNKNOWN;
    }

    public setup(providerMode: ProviderMode, merchantIdentifier: string, merchantSecret: string, transactionCallback?: TransactionCallback) {
        this.providerMode = providerMode;
        this.merchantIdentifier = merchantIdentifier;
        this.merchantSecret = merchantSecret;
        if (transactionCallback) {
            this.transactionCallback = transactionCallback;
        }
        this.inited = true;
    }

    public startTransaction(amount: number, currency: Currency, subject: string, customIdentifier: string) {
        if (this.inited) {
            this.doStartTransaction(amount, currency, subject, customIdentifier);
        } else {
            // TODO error
        }
    }

    protected doStartTransaction(amount: number, currency: Currency, subject: string, customIdentifier: string) {

    }

    public isLive(): boolean {
        return false;
    }
}

export interface TransactionCallback {
    // This will always be called
    onAction?(actionType: ActionRequestCode, actionResult: ActionResultCode, transaction: any): void;

    // Specific actions (already filtered)
    onPaymentApproved?(transaction: any): void;

    onPaymentDeclined?(transaction: any): void;
}

export enum ActionRequestCode {
    REQUEST_CODE_PAYMENT = 1001,
    REQUEST_CODE_PRINT_RECEIPT = 1003,
    REQUEST_CODE_SHOW_SUMMARY = 1005,
    REQUEST_CODE_LOGIN = 1007,
    REQUEST_CODE_SETTINGS = 1009,
    REQUEST_CODE_READ_CARD = 1011
}

export enum ActionResultCode {
    RESULT_CODE_APPROVED = 2001,
    RESULT_CODE_FAILED = 2004,
    RESULT_CODE_PRINT_SUCCESS = 3001,
    RESULT_CODE_PRINT_FAILED = 3004,
    RESULT_CODE_SUMMARY_CLOSED = 4001,
    RESULT_CODE_LOGIN_SUCCESS = 5001,
    RESULT_CODE_LOGIN_FAILED = 5002,
    RESULT_CODE_SETTINGS_CLOSED = 6001,
    RESULT_CODE_READ_CARD_SUCCESS = 7001,
    RESULT_CODE_READ_CARD_FAILED = 7002
}

export enum ProviderMode {
    UNKNOWN = 0,
    MOCK,
    TEST,
    LIVE,
    JUNGLE,
    TEST_FIXED,
    LIVE_FIXED
}

export enum Currency {
    UNKNOWN = 0,
    AED,
    ARS,
    AUD,
    AZN,
    BGN,
    BHD,
    BRL,
    CAD,
    CHF,
    CNY,
    COP,
    CZK,
    DKK,
    EGP,
    EUR,
    GBP,
    GHS,
    HKD,
    HRK,
    HUF,
    ILS,
    INR,
    JPY,
    KRW,
    KWD,
    MAD,
    MXN,
    MYR,
    NGN,
    NOK,
    NZD,
    OMR,
    PHP,
    PKR,
    PLN,
    QAR,
    RON,
    RSD,
    RUB,
    SAR,
    SEK,
    SGD,
    THB,
    TND,
    TRY,
    TWD,
    UAH,
    USD,
    VND,
    ZAR
}
