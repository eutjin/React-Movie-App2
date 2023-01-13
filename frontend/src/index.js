import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { AppProvider } from './context';

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  
}

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
    <App />
    </AppProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


