import './App.css';
import React from 'react'
import { useState } from 'react';

function App() {
const [input, setInput] = useState('green');
const [response, setResponse] = useState('');
const apiKey = process.env.OPENAI_API_KEY;

const handleSend = () => {
  fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: `Quelle est la valeur hexadécimale de la couleur ${input}?`,
      max_tokens: 60
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.choices && data.choices.length > 0) {
      setResponse(data.choices[0].text.trim());
    }
  })
  .catch(error => console.error('Erreur:', error));
  console.log('handleSend:',input);
};


const handleChange = event => {
      setInput(event.target.value);
      console.log(input);
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>NUIT DE L'INFO</h1>
        <p>Changez le thème avec ChatGPT : </p>
        <input value={input} onChange={handleChange}></input>
        <button onClick={handleSend}>Envoyer à ChatGPT</button>
    <div>
            <p style={{color : input}}>

        <strong >TEST</strong>
      </p>

    </div>
    </header>
    </div>
  );
}

export default App;