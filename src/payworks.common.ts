import {Observable} from 'tns-core-modules/data/observable';

export class Common extends Observable {
    protected inited = false;

    protected providerMode: string;
    protected merchantIdentifier: string;
    protected merchantSecret: string;

    constructor() {
        super();
        this.providerMode = "UNKNOWN";
    }

    public setup(providerMode: string, merchantIdentifier: string, merchantSecret: string) {
        this.providerMode = providerMode;
        this.merchantIdentifier = merchantIdentifier;
        this.merchantSecret = merchantSecret;
        this.inited = true;
    }

    public startTransaction(amount: number, currency : string, subject: string, customIdentifier: string) {
        if (this.inited) {
            this.doStartTransaction(amount, currency, subject, customIdentifier);
        } else {
            // TODO error
        }
    }

    public doStartTransaction(amount: number, currency : string, subject: string, customIdentifier: string) {

    }

    public isLive(): boolean {
        return this.providerMode.startsWith("LIVE");
    }
}

/* TODO for some reason the enums outside the plugin (in the app) are undefined
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
}*/
