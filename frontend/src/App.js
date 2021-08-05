import logo from './logo.svg';
import './App.css';

import {useState, useEffect, useDebugValue} from "react";

function App() {
    var [aesPlain, setAesPlain] = useState('')
    var [ecKey, setEcKey] = useState('')
    
    var [encrypted, setEncrypted] = useState('')
    var [privateKey, setPrivateKey] = useState('')

    var [decrypted, setDecrypted] = useState('')
    function callEncryptAPI() {
        // console.log({ecKey}, ' : ', {aesPlain})
        // console.log('call api method')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: 'React POST Request Example',
                ecKey:  ecKey,
                aesPlain: aesPlain
            })
        };
        fetch("http://127.0.0.1:8080/encrypt", requestOptions)
            .then(
                response => response.json()
            ).then((res) => {
                console.log(res)
                setEncrypted(res.encrypted)
                setPrivateKey(res.privateKey)
            })
    }
    function callDecryptAPI() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: 'React POST Request Example',
                encrypted:  encrypted,
                privateKey: privateKey
            })
        };
        fetch("http://127.0.0.1:8080/decrypt", requestOptions)
            .then(
                response => response.json()
            ).then((res) => {
                setDecrypted(res.decrypted)
            })
    }
    return (
        <div className="App">
            <div id="encrypt">
                <p>Encrypt</p>
                <div id="input">
                    EC Key: <input type="text" placeholder="ec key" value={ecKey} onChange={e=>setEcKey(e.target.value)}></input>
                    <br/>
                    AES Plain: <input type="text" placeholder="aes plain" value = {aesPlain} onChange = {e=>setAesPlain(e.target.value)}></input>
                    <br/>
                    Encrypted Result: <input type="text" placeholder="encrypted" value = {encrypted} onChange = {e=>setEncrypted(e.target.value)}></input>
                    <br/>
                    Decrypted Result: <input type="text" placeholder="decrypted" value = {decrypted} onChange = {e=>setDecrypted(e.target.value)}></input>
                </div>
                <div id="encrypt_click">
                    <button onClick={callEncryptAPI}>Encrypt</button>
                    <br/>
                    <button onClick={callDecryptAPI}>Decrypt</button>
                </div>
            </div>
        </div>
    );
}

export default App;
