// index.js

var aes = require('./aes_lib/wbaes-smoke-umd.js')

const express = require('express');
const bodyParser = require('body-parser');
const ecies = require('ecies-parity')
const bip39 = require('bip39')
const hd = require('hdkey')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var options = {
    counter: '1826e4111826e4111826e4111826e411', 
    encoding: 'str'
};


app.post('/post-test', async (req, res) => {
    try{
        const aesKey = req.body.aesKey
        var aesKey_whiteBox = aes.encrypt(aesKey, options)

        const derivationPath = "m/44'/60'/0'/0/0";
        const publicEcKey = req.body.eckey 
        const seed = await bip39.mnemonicToSeed(publicEcKey)        
        const node = hd.fromMasterSeed(seed)
        const hdkey = node.derive(derivationPath)
        const privateKey = hdkey._privateKey
        const publicKey = ecies.getPublic(privateKey)

        const encrypted = await ecies.encrypt(publicKey, Buffer.from("text"));
        console.log(encrypted.toString('base64'))
        res.send({
            "Encrypted Result": encrypted.toString('base64')
        })
    } catch (err) {
        console.error(err)
    }
});
function encrypt(plain) {
    var temp = aes.encrypt(plain, options)
    return (temp);
}
function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
var server = app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));
// server.close()