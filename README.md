[![npm](https://img.shields.io/npm/v/nativescript-payworks.svg)](https://www.npmjs.com/package/nativescript-payworks)
[![npm](https://img.shields.io/npm/dt/nativescript-payworks.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-payworks)

# NativeScript Payworks
**Payworks SDK PayButton** plugin for Nativescript.

Payworks is a payment gateway technology for Point of Sales.

**ALPHA version. Android only (iOS will come in the future, PR are welcome).**

### Install it
```
tns plugin add nativescript-payworks
```

### Use it

```
import {Payworks} from 'nativescript-payworks';

let payworks: Payworks;

payworks = new Payworks();
    
// Setup
payworks.setup("TEST", "<merchantIdentifier>", "<merchantSecret>");
    
// Start transaction
payworks.startTransaction(40.00, "EUR", "Test transaction", "Custom identifier");
```

## Dependencies

There are a lot of dependencies that this package will install, here the list:

```
compile 'com.google.android.gms:play-services-gcm:11.0.4'

compile 'com.android.support:appcompat-v7:25.3.1'
compile 'com.android.support:support-v4:25.3.1'
compile 'com.android.support:cardview-v7:25.3.1'

compile 'com.squareup:otto:1.3.5'
compile 'com.squareup.okhttp:okhttp:2.7.4'
compile 'com.squareup.okhttp:okhttp-ws:2.7.4'
compile 'com.parse.bolts:bolts-android:1.2.1'
compile 'com.fasterxml.jackson.core:jackson-databind:2.4.4'
compile 'com.couchbase.lite:couchbase-lite-android:1.4.0'
compile 'com.couchbase.lite:couchbase-lite-android-forestdb:1.4.0'

compile 'io.payworks:mpos.android.ui:2.25.2:@aar'
compile 'io.payworks:mpos.android.core:2.25.2:@aar'


// Add those three dependencies if you want to use a Miura card reader
compile 'io.payworks:mpos.android.accessories.miura:2.25.2:@aar'
compile 'io.payworks:mpos.android.comlinks.bluetooth:2.25.2:@aar'
compile 'io.payworks:mpos.android.comlinks.tcp:2.25.2:@aar'
```

You may need to use MultiDex.

## ProviderMode and Currency
For some reason the enums outside the plugin (in the app) are undefined so right now ProviderMode and Currency are strings.

```
ProviderMode = "TEST" | "LIVE"

Currency = "EUR" | "GBP" | "USD" etc.
```
## API

Coming soon...

Describe your plugin methods and properties here.
    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    
## Roadmap

* For some reason the enums outside the plugin (in the app) are undefined so right now ProviderMode and Currency are strings
* Configuration for features and accessories
* Documentation 
* iOS support
* More...
 
## License

Apache License Version 2.0, January 2004
