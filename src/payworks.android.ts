import {Common, Currency, ProviderMode} from './payworks.common';
import * as app from "tns-core-modules/application";

export {Currency, ProviderMode}

declare var io: any;

export class Payworks extends Common {

    private activity: android.app.Activity = null;
    private ui: any = null; // io.mpos.ui.shared.MposUi

    public setup(providerMode: ProviderMode, merchantIdentifier: string, merchantSecret: string) {
        super.setup(providerMode, merchantIdentifier, merchantSecret);

        if (this.inited) {
            this.activity = app.android.foregroundActivity;

            if (this.activity === app.android.startActivity) {

                // Init UI
                this.ui = io.mpos.ui.shared.MposUi.initialize(this.activity, io.mpos.provider.ProviderMode.valueOf(ProviderMode[providerMode]), this.merchantIdentifier, this.merchantSecret);

                // Call back
                app.android.foregroundActivity.onActivityResult = (requestCode: number, resultCode: number, data: android.content.Intent) => {
                    if (requestCode == io.mpos.ui.shared.MposUi.REQUEST_CODE_PAYMENT) {
                        if (resultCode == io.mpos.ui.shared.MposUi.RESULT_CODE_APPROVED) {
                            // Transaction was approved
                            android.widget.Toast.makeText(this.activity, "Transaction approved", android.widget.Toast.LENGTH_LONG).show();
                        } else {
                            // Card was declined, or transaction was aborted, or failed
                            // (e.g. no internet or accessory not found)
                            android.widget.Toast.makeText(this.activity, "Transaction was declined, aborted, or failed", android.widget.Toast.LENGTH_LONG).show();
                        }
                        // Grab the processed transaction in case you need it
                        // (e.g. the transaction identifier for a refund).
                        // Keep in mind that the returned transaction might be null
                        // (e.g. if it could not be registered).
                        let transaction = io.mpos.ui.shared.MposUi.getInitializedInstance().getTransaction();

                        // TODO callback with the transaction reference
                    }
                }
            } else {
                this.inited = false;

                // TODO send error
            }
        }
    }

    public doStartTransaction(amount: number, currency : Currency, subject: string, customIdentifier: string) {
        if (this.inited) {

            // TODO setup: add extra config
            this.ui.getConfiguration().setSummaryFeatures(java.util.EnumSet.of(
                // Add this line, if you do want to offer printed receipts
                // MposUiConfiguration.SummaryFeature.PRINT_RECEIPT,
                io.mpos.ui.shared.model.MposUiConfiguration.SummaryFeature.SEND_RECEIPT_VIA_EMAIL)
            );

            // TODO setup: add extra config
            // let accessoryParameters = new io.mpos.accessories.parameters.AccessoryParameters.Builder(io.mpos.accessories.AccessoryFamily.MOCK).mocked().build();
            let accessoryParameters = new io.mpos.accessories.parameters.AccessoryParameters.Builder(io.mpos.accessories.AccessoryFamily.MIURA_MPI).bluetooth().build();

            this.ui.getConfiguration().setTerminalParameters(accessoryParameters);

            let transactionParameters = new io.mpos.transactions.parameters.TransactionParameters.Builder()
                .charge(new java.math.BigDecimal(amount), io.mpos.transactions.Currency.valueOf(Currency[currency]))
                .subject(subject)
                .customIdentifier(customIdentifier) // TODO add more external info
                .build();

            let intent = this.ui.createTransactionIntent(transactionParameters);
            this.activity.startActivityForResult(intent, io.mpos.ui.shared.MposUi.REQUEST_CODE_PAYMENT);
        }
    }
}
