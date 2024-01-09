import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import './App.css';

const socket = io( 
  'https://stackblitzstartersblauzx-3l4o--4000--a2aabdd9.local-credentialless.webcontainer.io/'
 );

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

 const handleSubmit = (e) => {
   e.preventDefault();
   
   if (message === "") return

   setMessages([...messages, message])
   socket.emit('message', message);
   
   setMessage('');
  };

  useEffect(() => {
    socket.on('messageEmit', reciveMessage);
    
    return () => {
      socket.off("messageEmit", reciveMessage);
    };
  }, []);

  const reciveMessage = (message) => 
    setMessages((state) => [...state, message])

  return (
    <>
      <h1>« Simple - Chat »</h1>
      <section id="chat">
        <div id="messages">
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
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
