// index.js

var cors = require('cors')

var aes = require('./aes_lib/wbaes-smoke-umd.js')
var aes_encrypt = require('./aes_lib/wbaes-encrypt.js')
var aes_decrypt = require('./aes_lib/wbaes-decrypt.js')

const express = require('express');
const bodyParser = require('body-parser');
const ecies = require('ecies-parity')
const bip39 = require('bip39')
const hd = require('hdkey')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var options = {
    counter: '1826e4111826e4111826e4111826e411', 
    encoding: 'str'
};

app.get('/', async(req, res) => {
    res.send({
        "cdg": "cdg great"
    })
})
app.post('/test', async(req, res) => {
    try{
        res.send({
            "result": req.body.title,
            "ec Key": req.body.ecKey
        })
    } catch (err) {
        console.error(err)
    }
})
app.post('/encrypt', async (req, res) => {
    try{
        const aes_plain = req.body.aesPlain
        
        const derivationPath = "m/44'/60'/0'/0/0";
        const publicEcKey = req.body.eckey 
        let seed = await bip39.mnemonicToSeed(publicEcKey)        
        let node = hd.fromMasterSeed(seed)
        let hdkey = node.derive(derivationPath)
        let privateKey = hdkey._privateKey
        let publicKey = ecies.getPublic(privateKey)


        var cipher_txt = aes_encrypt.encrypt(aes_plain, options)
        let encrypted = await ecies.encrypt(publicKey, cipher_txt);

        

        res.send({
            "encrypted": encrypted.toString('base64'),
            "privateKey": privateKey.toString('base64')
        })
    } catch (err) {
        console.error(err)
    }
});
app.post('/decrypt', async(req, res) => {
    try{
        const encrypted = Buffer.from(req.body.encrypted, 'base64')
        const privateKey = Buffer.from(req.body.privateKey, 'base64')
        
        let ttt = await ecies.decrypt(privateKey, encrypted)
        let aes_plain_re = aes_decrypt.decrypt(ttt.toString('utf8'), options)
        res.send({
            "decrypted": aes_plain_re
        })
    } catch (err) {
        console.error(err)
    }
})
var server = app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));