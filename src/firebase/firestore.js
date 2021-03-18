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
