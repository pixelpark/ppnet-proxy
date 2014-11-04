ppnet-proxy
===========

A simple proxy for [PPnet](https://github.com/pixelpark/ppnet) to limit access to the remote couchdb.

## Installation
Checkout ppnet-proxy repository and "cd" into ppnet folder
``` bash
    git clone https://github.com/pixelpark/ppnet-proxy.git
```

Install all require packages
``` bash
    npm install
```

## Usage
Adapt your PPnet-config.json (see [config.json](https://github.com/pixelpark/ppnet/blob/master/app/config.js)) so that the remote-addresses link to your proxy.
You should also adapt the config.json of the ppnet-proxy. The config-files should match by the database names.
Run the proxy by the following command.
``` bash
    node proxy.js
```

Database-requests should now be handled by your proxy.
