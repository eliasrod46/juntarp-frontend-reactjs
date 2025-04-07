import { envs } from "../../../config";

const baseURL = envs.apiServer.serverUrl;
const URL = `${baseURL}/turnos/turnos-types`;

export const getTurnosTypesApi = async () => {
  try {
    const res = await fetch(URL);
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    //query to backend fail (TODO something)
    console.log(error);
    return false;
  }
};

export const updateTurnoTypeApi = async (id, data) => {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "PATCH", // Usamos el método PATCH
      headers: {
        "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
      },
      body: JSON.stringify(data), // Convertimos los datos a formato JSON
    });
    const resJson = await res.json();

    return resJson;
  } catch (error) {
    //query to backend fail (TODO something)
    // console.log(error.message);
    return false;
  }
};

export const createTurnoTypeApi = async (data) => {
  try {
    const res = await fetch(`${URL}`, {
      method: "POST", // Usamos el método POST
      headers: {
        "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
      },
      body: JSON.stringify(data), // Convertimos los datos a formato JSON
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    //query to backend fail (TODO something)
    console.log(error);
    return false;
  }
};

export const deleteTurnoTypeApi = async (id) => {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE", // Usamos el método PATCH
      headers: {
        "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
      },
    });
    const resJson = await res.json();
    // console.log(resJson);
    return resJson;
  } catch (error) {
    //query to backend fail (TODO something)
    // console.log(error);
    return false;
  }
};
