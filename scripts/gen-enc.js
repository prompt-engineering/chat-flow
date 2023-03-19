// node scripts/gen-enc.js 1234567890
// read secret from command line
let secret = process.argv[2];
// create key from secret
let key = require("node:crypto").createHash("sha256").update(String(secret)).digest("base64").substr(0, 32);

console.log(key);
