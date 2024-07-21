import React, { useState, useEffect } from 'react';

const Chat = ({ socketRef, username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


    



  const handleSendMessage = () => {
    
    if (newMessage.trim() !== '') {
      const message = {
        text: newMessage,
        username: username,
        timestamp: new Date().toLocaleTimeString(),
      };

      // Emit the message to the server using socket.io
      
      socketRef.current.emit('chat message', message);

      // Update the local messages state
      setMessages([...messages, message]);

      // Clear the input field
      setNewMessage('');
    }
  };

  

  // Listen for incoming messages from the server
  useEffect(() => {
    
    if(socketRef.current){
    socketRef.current.on('chat message', (message) => {
        console.log("Message ka username ",message.username," username ",username);
      if(message.username!==username){
      setMessages([...messages, message]);
      }
    });
}
  }, [messages, socketRef]);


  return (
    
    
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat Section : </h1>
      </div>
      <div className="chat-messages-container">
        {messages.length === 0 ? (
          <p className="no-messages">Send a message to join the chat</p>
        ) : (
          <div className="chat-messages">
            <ul>
              {messages.map((message, index) => (
                <li key={index} className="chat-message">
                  <div className="message-info">
                    <strong>{message.username}</strong> ({message.timestamp}):
                  </div>
                  <div className="message-text">{message.text}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  
  );
};

export default Chat;
