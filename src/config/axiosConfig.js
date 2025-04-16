// axiosConfig.js

import axios from "axios";
import { envs } from "./globalVars";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    let formattedError = {};
    if (envs.envState == "development") {
      // console.log("error: ",error);
      // console.log("error.response: ",error.response);
      // console.log("error.request: ",error.request);
    }

    if (error.response) {
      const { status, data } = error.response;

      //mandejo erroes del backend
      if (data && data.statusCode && data.message) {
        formattedError = {
          statusCode: data.statusCode,
          message: data.message,
        };

        // if is a class-validator erros: (statusCode 400 & message as array)
        if (data.statusCode === 400 && Array.isArray(data.message)) {
          formattedError.message = "Errores de validación"; 
          formattedError.validationErrors = {};
          data.message.forEach((error) => {
            const primeraPalabra = error.split(" ")[0];
            if (!formattedError.validationErrors[primeraPalabra]) {
              formattedError.validationErrors[primeraPalabra] = [];
            }
            formattedError.validationErrors[primeraPalabra].push(error);
          });
        }

        // other opctional acctions
        if (data.statusCode === 401) {
          if (envs.envState == "development") {
            console.log("No autorizadio");
          }
        }

        // other opctional acctions
        if (data.statusCode === 404) {
          if (envs.envState == "development") {
            console.log("Not found.");
          }
        }
      } else {
        // Error de respuesta del servidor pero sin el formato esperado
        formattedError = {
          statusCode: status,
          message: "Error inesperado del servidor",
          details: data,
        };
      }
    } else if (error.request) {
      // Error de conexión
      formattedError = {
        statusCode: 500,
        message: "No se pudo conectar con el servidor.",
      };
      // logs on develop
    } else {
      // Error al configurar la petición
      formattedError = {
        statusCode: 500,
        message: "Error al configurar la petición.",
      };
    }

    return Promise.reject(formattedError);
  }
);

export default axios;
