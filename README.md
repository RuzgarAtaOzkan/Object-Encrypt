# object-encrypt

# 🚀 Quick start

If you're new to Quontral, check the [quickstart guide in the official docs](https://docs.quontral.com/quontral-swap-api/quick-start) on how to get started.

## 1. Install Quontral

The easiest way to integrate the Quontral SDK into your JavaScript project is through the npm module.

Install the package via `npm`:

```shell
npm install quontral
```

Adding Quontral to the frontend project is by the following

```javascript
import Quontral from 'quontral';
```

## 2. Initialize Quontral

After your dependency is added, you simply need to initialize quontral with class initialization:

> **⚠️ Warning**: Make sure to keep your api key private

```javascript
const service = new Quontral({ apiKey: 'YOUR_API_KEY' });
```

```js
// OE stands for ObjectEncrypt
const OE = require('object-encrypt');

const mySecret = 'secret123';

// Create a key based on that secret password.
const key = OE.createKey(mySecret);
// Key should not be exposed to client side or any other third party which can be malicious.

// Encrypt that secret with the key
const encrypted = OE.encrypt(mySecret, key);

// Decrypt that encrypted secret with the same key
const decrypted = OE.decrypt(encrypted, key);

// A key is both for encrypting and decrypting a secret.
```
