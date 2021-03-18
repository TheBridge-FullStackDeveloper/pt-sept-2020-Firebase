import firebase from './index';
// DOCS: https://firebase.google.com/docs/firestore/query-data/get-data?hl=es

// Con esta función nos conectamos con la colección vehicles siempre que la invoquemos
const vehicles = () => firebase.firestore().collection('vehicles');

export const getVehicles = async () => {
  // Esto se conecta a firebase y accede a la colección de vehicles
  const snapshot = await vehicles().get();

  if (snapshot.empty) {
    return [];
  }

  // Si el snapshot no está vacío recorro los docs para generar mis objetos
  const documents = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return documents;
};

export const getVehiclesByType = async (type) => {
  // Todos los vehicles con el campo type igual a mi variable type son los que recibo
  const snapshot = await vehicles().where('type', '==', type).get();

  if (snapshot.empty) {
    return [];
  }

  // Si el snapshot no está vacío recorro los docs para generar mis objetos
  const documents = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  console.log(documents);
  return documents;
};

// Todo lo que afecte a UN ÚNICO documento se hace con este patrón
export const getVehicleById = async (id) => {
  // Pasando la id dentro de .doc(id) obtenemos la referencia a UN solo elemento
  const snapshot = await vehicles().doc(id).get();

  // Para un solo elemento la snapshot se trata de forma distinta
  if (!snapshot.exists) {
    return null;
  }

  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
};

export const updateVehicleById = async (id, newVehicleData) => {
  try {
    // Actualizamos un elemento de la DB con nuevos datos dada su Id
    await vehicles().doc(id).update(newVehicleData);

    // Volvemos a recuperar el elemento de la DB
    const vehicle = await getVehicleById(id);
    return vehicle;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createVehicle = async (newVehicle) => {
  // Para añadir elementos con más restricciones debo seleccionar a mano los campos que quiero guardar
  const savedSnapshot = await vehicles().add(newVehicle);
  // Una vez guardo el elemento, recupero su snapshot de Firebase 💸
  const snapshot = await savedSnapshot.get();

  // Para un solo elemento la snapshot se trata de forma distinta
  if (!snapshot.exists) {
    return null;
  }

  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
};

export const deleteVehicleById = async (id) => {
  try {
    // Pasando la id dentro de .doc(id) obtenemos la referencia a UN solo elemento
    await vehicles().doc(id).delete();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
