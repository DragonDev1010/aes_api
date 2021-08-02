// index.js

var aes = require('./aes_lib/wbaes-smoke-umd.js')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var options = {
    counter: '1826e4111826e4111826e4111826e411', 
    encoding: 'str'
};


app.post('/post-test', (req, res) => {
    const ec_key = req.body.ec_key;
    const aes_key = req.body.aes_key;
    const ec_res = encrypt(ec_key)
    const aes_res = encrypt(aes_key)
    console.log(ec_res)
    console.log(aes_res)
    console.log(Buffer.from(ec_res).toString('base64'));
    console.log(Buffer.from(aes_res).toString('base64'));
    // res.sendStatus(200);    
    res.send({
        "Encrypted EC Key": Buffer.from(ec_res).toString('base64'),
        "Encrypted AES Key": Buffer.from(aes_res).toString('base64')
    })
});
function encrypt(plain) {
    var temp = aes.encrypt(plain, options)
    return (temp);
}
app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));