import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from "react";

function App() {
    const [mounted, setMounted] = useState(false)
    useEffect(() =>{
        // This is similar to componentDidMount
        // Call back-end api here
        console.log('call backend')
        fetch("http://127.0.0.1:8080").
            then(
                console.log('fetch')
            )
    },[])
    return (
        <div className="App">
            <div id="encrypt">
                <p>Encrypt</p>
                <div id="input">
                    <p>Input: </p>
                    <input type="text" placeholder="ec key"></input>
                    <input type="text" placeholder="aes plain"></input>
                </div>
                <div id="result">
                    <p>Result: </p>
                    <input type="text" placeholder="encrypted result"></input>
                </div>
                <div id="encrypt_click">
                    <button>Encrypt</button>
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
                    <button >Decrypt</button>
                </div>
            </div>
        </div>
    );
}

export default App;
