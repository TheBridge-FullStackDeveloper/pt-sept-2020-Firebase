import { useState, useEffect, createContext } from 'react';
import firebase from './index';

export const AuthContext = createContext();

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Aquí podríamos tener un state para gestionar isLoading

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      console.log('onAuthStateChanged', currentUser);

      if (currentUser) {
        const email = currentUser.email;
        const userId = currentUser.uid;
        // Seteamos los datos del usuario en un estado para mostrarlo cuando la aplicación arranca
        setUser({
          isNewUser: false,
          email,
          id: userId,
        });
      } else {
        setUser(null);
      }

      // Aquí es donde podemos quitar un state que gestiona el isLoading
    });
  }, []);

  function handleRegister(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log('El error:');
        console.log(error);

        if (error.code === 'auth/weak-password') {
          alert('Contraseña débil, mínimo 6 caracteres');
        }

        if (error.code === 'auth/email-already-in-use') {
          alert('Este usuario ya está registrado');
        }
      });
  }

  function handleLogin(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log('Error:', error);

        if (error.code === 'auth/user-not-found') {
          alert('El usuario no existe');
        }
      });
  }

  function handleLogout() {
    firebase.auth().signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
