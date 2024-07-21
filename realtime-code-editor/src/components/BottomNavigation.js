import React, { useState } from 'react';

const BottomNavigation = ({ onSelectTab, selectedTab }) => {
    return (
        <div style={{ position: 'fixed', bottom: 0, right: 0, width: '100%', background: 'lightgray', boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'space-between' , width:'415px'}}>
          <button onClick={() => onSelectTab('chat')} style={{ flex: 1, padding: '10px 0', background: selectedTab === 'chat' ? 'lightblue' : 'none', border: 'none', cursor: 'pointer', outline: 'none', transition: 'background 0.3s' }}>
            Chat
          </button>
          <button onClick={() => onSelectTab('fileUpload')} style={{ flex: 1, padding: '10px 0', background: selectedTab === 'fileUpload' ? 'lightblue' : 'none', border: 'none', cursor: 'pointer', outline: 'none', transition: 'background 0.3s' }}>
            File Upload
          </button>
        </div>
      );
};

export default BottomNavigation;
