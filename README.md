# carlo-rpc-simple

Simpler way of using [Carlo]'s [RPC API][carlo/rpc]

[carlo]: https://github.com/GoogleChromeLabs/carlo
[carlo/rpc]: https://github.com/GoogleChromeLabs/carlo/blob/master/rpc/rpc.md

## Install

```
npm i carlo-rpc-simple
```

## Usage

* Node

    ```js
    const carlo = require('carlo')
    const RPC = require('carlo-rpc-simple')

    class YourRPC extends RPC {
      yourNodeMethod () { ... } ────────────────────┐
    }                                               │
                                                    │
    const app = carlo.launch(...)                   │
    const yourRPC = new YourRPC()                   │
    await app.load(uri, yourRPC.loadParams())       │
    await yourRPC.remoteReady                       │
                                                    │
    yourRPC.remote.yourBrowserMethod() ───────────┐ │
    ```

* Browser

    ```js
    const RPC = require('carlo-rpc-simple')       │ │
                                                  │ │
    class YourRPC extends RPC {                   │ │
      yourBrowserMethod () { ... } ───────────────┘ │
    }                                               │
                                                    │
    const yourRPC = new YourRPC()                   │
    await yourRPC.loadParams()                      │
                                                    │
    yourRPC.remote.yourNodeMethod() ────────────────┘
    ```
