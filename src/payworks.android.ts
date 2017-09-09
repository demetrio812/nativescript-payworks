import {Common, Currency, ProviderMode, TransactionCallback, ActionRequestCode, ActionResultCode} from './payworks.common';
import * as app from "tns-core-modules/application";

export {Currency, ProviderMode, TransactionCallback, ActionRequestCode, ActionResultCode}

declare var io: any;

export class Payworks extends Common {

    private activity: android.app.Activity = null;
    private ui: any = null; // io.mpos.ui.shared.MposUi

    // TODO put the config in an object
    public setup(providerMode: ProviderMode, merchantIdentifier: string, merchantSecret: string, transactionCallback: TransactionCallback) {
        super.setup(providerMode, merchantIdentifier, merchantSecret, transactionCallback);

        if (this.inited) {
            this.activity = app.android.foregroundActivity;

            if (this.activity === app.android.startActivity) {

                // Init UI
                this.ui = io.mpos.ui.shared.MposUi.initialize(this.activity, io.mpos.provider.ProviderMode.valueOf(ProviderMode[providerMode]), this.merchantIdentifier, this.merchantSecret);

                // TODO setup: add extra config
                // let accessoryParameters = new io.mpos.accessories.parameters.AccessoryParameters.Builder(io.mpos.accessories.AccessoryFamily.MOCK).mocked().build();
                let accessoryParameters = new io.mpos.accessories.parameters.AccessoryParameters.Builder(io.mpos.accessories.AccessoryFamily.MIURA_MPI).bluetooth().build();

                this.ui.getConfiguration().setTerminalParameters(accessoryParameters);

                // TODO put colours in config
                this.ui.getConfiguration().getAppearance()
                    .setColorPrimary(android.graphics.Color.parseColor("#e72b1e"))
                    .setColorPrimaryDark(android.graphics.Color.parseColor("#e72b1e"))
                    .setTextColorPrimary(android.graphics.Color.WHITE);


                // Call back
                app.android.foregroundActivity.onActivityResult = (requestCode: number, resultCode: number, data: android.content.Intent) => {
                    // Grab the processed transaction in case you need it
                    // (e.g. the transaction identifier for a refund).
                    // Keep in mind that the returned transaction might be null
                    // (e.g. if it could not be registered).
                    let transaction = io.mpos.ui.shared.MposUi.getInitializedInstance().getTransaction();

                    // Generic action
                    if (this.transactionCallback && this.transactionCallback.onAction) {
                        this.transactionCallback.onAction(requestCode, resultCode, transaction);
                    }

                    // Specific actions
                    if (requestCode == io.mpos.ui.shared.MposUi.REQUEST_CODE_PAYMENT) {
                        if (resultCode == io.mpos.ui.shared.MposUi.RESULT_CODE_APPROVED) {
                            // Transaction was approved
                            if (this.transactionCallback && this.transactionCallback.onPaymentApproved) {
                                this.transactionCallback.onPaymentApproved(transaction);
                            }
                        } else {
                            // Card was declined, or transaction was aborted, or failed
                            // (e.g. no internet or accessory not found)
                            // Transaction was declined
                            if (this.transactionCallback && this.transactionCallback.onPaymentDeclined) {
                                this.transactionCallback.onPaymentDeclined(transaction);
                            }
                        }
                    }
                }
            } else {
                this.inited = false;

                // TODO send error
            }
        }
    }

    public isLive(): boolean {
        if (this.inited) {
            return io.mpos.provider.ProviderMode.valueOf(ProviderMode[this.providerMode]).isLive();
        } else {
            // TODO send error
            return false;
        }
    }

    protected doStartTransaction(amount: number, currency : Currency, subject: string, customIdentifier: string) {
        if (this.inited) {
            // TODO setup: add extra config
            this.ui.getConfiguration().setSummaryFeatures(java.util.EnumSet.of(
                // Add this line, if you do want to offer printed receipts
                // MposUiConfiguration.SummaryFeature.PRINT_RECEIPT,
                io.mpos.ui.shared.model.MposUiConfiguration.SummaryFeature.SEND_RECEIPT_VIA_EMAIL)
            );

            let transactionParameters = new io.mpos.transactions.parameters.TransactionParameters.Builder()
                .charge(new java.math.BigDecimal(amount), io.mpos.transactions.Currency.valueOf(Currency[currency]))
                .subject(subject)
                .customIdentifier(customIdentifier) // TODO add more external info
                .build();

            let intent = this.ui.createTransactionIntent(transactionParameters);
            this.activity.startActivityForResult(intent, io.mpos.ui.shared.MposUi.REQUEST_CODE_PAYMENT);
        } else {

            // TODO send error
        }
    }
}
