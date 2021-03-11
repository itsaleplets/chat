import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Chat from './components/chat/Chat';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Chat />
      </div>
    </Provider>
  );
}

export default App;
