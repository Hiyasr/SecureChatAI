import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:5000'); // Replace with your server URL
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        return () => socket.disconnect();
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        const socket = io('http://localhost:5000'); // Replace with your server URL
        socket.emit('sendMessage', message);
        setMessage('');
    };

    return (
        <div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
