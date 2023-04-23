import React from 'react';
import List from './List';
import './App.css';

function App() {
  const items = [
    { text: 'Text 1' },
    { text: 'Text 2' },
    { text: 'Text 3' },
  ];

  return (
    <div>
      <h1>Items List</h1>
      <List items={items} />
    </div>
  );
}

export default App;
