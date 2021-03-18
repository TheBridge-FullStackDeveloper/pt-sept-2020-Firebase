import { useContext, useEffect } from 'react';

import { AuthContext } from './firebase/auth';
import { getVehicles } from './firebase/firestore';

import './App.css';

// 0. Instalar Firebase npm i firebase ✅
// 0.5 Inicializar Firebase en su archivo firebase/index.js ✅
// 1. Registrar un usuario a través de email y contraseña ✅
// 2. Hacer login con un usuario ya registrado ✅
// 3. Hacer logout con un usuario logeado ✅
// 4. Gestionar todo el flow de autenticación con un hook

const email = 'cristian@thebridgeschool.es';
const password = '123456';

function App() {
  const {
    user,
    handleLogout,
    handleRegister,
    handleLogin,
    handleGoogleSignin,
  } = useContext(AuthContext);

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to my App Hola</h1>
      {user ? (
        <div>
          <h3>
            {user.email} | {user.id}
          </h3>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleRegister(email, password)}>
            Registrar usuario
          </button>
          <br />
          <button onClick={() => handleLogin(email, password)}>
            Logear usuario
          </button>
          <br />
          <button onClick={handleGoogleSignin}>Entrar con Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
