// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Keep your global styles if any
import App from './App';
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css'; // Import SLDS

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
