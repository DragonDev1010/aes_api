import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from "react";

function App() {
    var [aesPlain, setAesPlain] = useState('')
    var [ecKey, setEcKey] = useState('')
    
    var [encrypted, setEncrypted] = useState('')
    var [privateKey, setPrivateKey] = useState('')
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
                console.log(res)
            })
    }
    return (
        <div className="App">
            <div id="encrypt">
                <p>Encrypt</p>
                <div id="input">
                    <p>Input: </p>
                    <input type="text" placeholder="ec key" value={ecKey} onChange={e=>setEcKey(e.target.value)}></input>
                    <input type="text" placeholder="aes plain" value = {aesPlain} onChange = {e=>setAesPlain(e.target.value)}></input>
                </div>
                <div id="result">
                    <p>Result</p>
                    <input type="text" placeholder="encrypted" value = {encrypted} onChange = {e=>setEncrypted(e.target.value)}></input>
                </div>
                <div id="encrypt_click">
                    <button onClick={callEncryptAPI}>Encrypt</button>
                </div>
            </div>

            <div id="decrypt">
                <p>Decrypt</p>
                <div id="input">
                    <p>Input: </p>
                    <input type="text" placeholder = "encrypted result"></input>
                </div>
                <div id="result">
                    <p>Result: </p>
                    <input type="text" placeholder = "decrypted"></input>
                </div>
                <div id="decrypt_click">
                    <button onClick={callDecryptAPI}>Decrypt</button>
                </div>
            </div>
        </div>
    );
}

export default App;
