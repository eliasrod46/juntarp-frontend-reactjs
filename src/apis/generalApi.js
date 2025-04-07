// generalApi.js
import { useContext } from "react";
import { envs } from "../config";

const baseURL = envs.apiServer.serverUrl;

export async function getElementsBase(authTokens, endpointUrl) {
  try {
    const res = await fetch(`${baseURL}${endpointUrl}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authTokens}`,
      },
    });
    const resJson = await res.json();
    return resJson;
    // if (res.status == 200) {
    //   return resJson;
    // } else {
    //   console.log(resJson);
    // }
  } catch (error) {
    //query to backend fail (TODO something)
    console.log(error);

    return { error: "generalApi" };
  }
}

export async function updateElementBase(authTokens, endpointUrl, id, data) {
  try {
    const res = await fetch(`${baseURL}${endpointUrl}/${id}`, {
      method: "PATCH", // Usamos el método PATCH
      headers: {
        "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
        Authorization: `Bearer ${authTokens}`,
      },
      body: JSON.stringify(data), // Convertimos los datos a formato JSON
    });
    const resJson = await res.json();

    return resJson;
  } catch (error) {
    //query to backend fail (TODO something)
    // console.log(error.message);
    return { error: "generalApi" };
  }
}

export const createElementBase = async (authTokens, endpointUrl, data) => {
  try {
    const res = await fetch(`${baseURL}${endpointUrl}`, {
      method: "POST", // Usamos el método POST
      headers: {
        "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
        Authorization: `Bearer ${authTokens}`,
      },
      body: JSON.stringify(data), // Convertimos los datos a formato JSON
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    //query to backend fail (TODO something)
    console.log(error);
    return { error: "generalApi" };
  }
};

export const deleteElementBase = async (authTokens, endpointUrl, id) => {
  try {
    const res = await fetch(`${baseURL}${endpointUrl}/${id}`, {
      method: "DELETE", // Usamos el método PATCH
      headers: {
        "Content-Type": "application/json", // Indicamos que enviamos datos en formato JSON
        Authorization: `Bearer ${authTokens}`,
      },
    });
    const resJson = await res.json();
    // console.log(resJson);
    return resJson;
  } catch (error) {
    //query to backend fail (TODO something)
    // console.log(error);
    return { error: "generalApi" };
  }
};
