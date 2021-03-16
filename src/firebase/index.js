import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB2dkKSCaR9RkoQShvO9RfRbwh07aY6Hk0',
  authDomain: 'thebridge-sept-2020.firebaseapp.com',
  projectId: 'thebridge-sept-2020',
  storageBucket: 'thebridge-sept-2020.appspot.com',
  messagingSenderId: '972441414925',
  appId: '1:972441414925:web:d4b33b942f3eebcf205444',
};

// Inicializamos la Web App de firebase
// Si firebase NO ha creado ninguna instancia de firebase app, la inicializamos
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
