import { envs } from "../../../config";

const baseURL = envs.apiServer.serverUrl; ///api
const endpointURL = `/auth`;

export const loginApi = async (data) => {
  try {
    const res = await fetch(`${baseURL}${endpointURL}/login`, {
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
    // console.log(error);
    return { error: "generalApi" };
  }
};
// 'Authorization': `Bearer ${authTokens}`
