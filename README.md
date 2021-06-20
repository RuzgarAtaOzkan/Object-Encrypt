# object-encrypt

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
