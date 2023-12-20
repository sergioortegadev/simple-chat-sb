import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import './App.css';

const socket = io(
  'https://stackblitzstartersblauzx-3l4o--4000--a2aabdd9.local-credentialless.webcontainer.io/'
);

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('messageEmit', (message) => {
      console.log(message);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit('message', message);

    setMessage('');
  };

  return (
    <>
      <h1>« Simple - Chat »</h1>
      <section id="chat">
        <div id="messages"></div>
        <form id="form" onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Escribir mensaje..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button> ▶ </button>
        </form>
      </section>
    </>
  );
}

export default App;
