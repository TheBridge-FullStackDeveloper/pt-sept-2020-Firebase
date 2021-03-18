import { useContext, useEffect, useState } from 'react';

import { AuthContext } from './firebase/auth';
import {
  getVehicles,
  getVehicleById,
  getVehiclesByType,
  deleteVehicleById,
  createVehicle,
  updateVehicleById,
} from './firebase/firestore';

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

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicles().then((vehiclesData) => setVehicles(vehiclesData));
    // getVehiclesByType('car');
    // getVehicleById('kFoYwSXkIlnICL49lW4N').then(console.log);

    // Actualiza en la recarga de la página (solo como demostración)
    // updateVehicleById('VZTFUZN8De27MswRDjKn', {
    //   brand: 'Suzuki',
    //   color: 'green',
    // }).then((updatedVehicle) => {
    //   console.log(updatedVehicle);
    // });
  }, []);

  function handleClickDelete(id) {
    // 1. Borro el elemento de la base de datos de Firestore
    deleteVehicleById(id).then((isDeleted) => {
      // 2. En caso de que el elemento se haya borrado con éxito, ejecuto más código
      if (isDeleted) {
        // 3. Filtro y me quedo con todos los vehículos que NO SON el que he borrado
        const filteredVehicles = vehicles.filter(
          (vehicle) => vehicle.id !== id
        );
        // 4. Cambio el state para reflejar en el front lo que ha ocurrido
        setVehicles(filteredVehicles);
      }
    });
  }

  function handleClickCreate(newVehicle) {
    // 1. Creo un vehículo nuevo
    createVehicle(newVehicle).then((vehicle) => {
      // 2. Cuando el vehículo se crea y lo recibo en el .then, lo añado al array de mi state vehicles
      setVehicles([...vehicles, vehicle]);
    });
  }

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

      <hr />

      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <span>
              {vehicle.id} - {vehicle.type}
            </span>{' '}
            <button onClick={() => handleClickDelete(vehicle.id)}>❌</button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => handleClickCreate({ type: 'rocket', brand: 'SpaceX' })}
      >
        Crear vehículo 🚀
      </button>
    </div>
  );
}

export default App;
