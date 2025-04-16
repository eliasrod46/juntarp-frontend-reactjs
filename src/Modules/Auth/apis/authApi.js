import axios from "../../../config/axiosConfig"; // Importa la instancia con el interceptor
import { envs } from "../../../config";

const baseURL = envs.apiServer.serverUrl; // /api
const endpointURL = `/auth`;

export const loginApi = async (data) => {
  try {
    const response = await axios.post(`${baseURL}${endpointURL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // El interceptor global ya ha formateado el error, así que simplemente lo re-lanzamos
    throw error;
  }
};
