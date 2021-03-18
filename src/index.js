import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Importo el wrapper que otorga permisos de atenticación y funciones
// a toda mi app. Y envuelvo todo desde index.js
import { FirebaseAuthProvider } from './firebase/auth';

ReactDOM.render(
  <React.StrictMode>
    {/* HOC High Order Component */}
    <FirebaseAuthProvider>
      <App />
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
