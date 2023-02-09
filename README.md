# object-encrypt

# 🚀 Quick start

## 1. Install Object Encrypt

The easiest way to integrate the Object-Encrypt SDK into your JavaScript project is through the npm module.

Install the package via `npm`:

```shell
npm install object-encrypt
```

## 2. Initialize Object-Encrypt

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
