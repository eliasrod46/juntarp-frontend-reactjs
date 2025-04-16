// generalApi.js
import axios from "../config/axiosConfig";
import { envs } from "../config";

const baseURL = envs.apiServer.serverUrl;


export async function getElementsBase(authTokens, endpointUrl) {
  try {
    const response = await axios.get(`${baseURL}${endpointUrl}`, {
      headers: {
        Authorization: `Bearer ${authTokens}`,
      },
    });
    
    return response.data;
  } catch (error) {
    throw error; // El interceptor global ya ha formateado el error
  }
}

export async function updateElementBase(authTokens, endpointUrl, id, data) {
  try {
    const response = await axios.patch(`${baseURL}${endpointUrl}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error; // El interceptor global ya ha formateado el error
  }
}

export const createElementBase = async (authTokens, endpointUrl, data) => {
  try {
    const response = await axios.post(`${baseURL}${endpointUrl}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error; // El interceptor global ya ha formateado el error
  }
};

export const deleteElementBase = async (authTokens, endpointUrl, id) => {
  try {
    const response = await axios.delete(`${baseURL}${endpointUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error; // El interceptor global ya ha formateado el error
  }
};
