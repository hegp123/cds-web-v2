import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

/**
 * Consume servicio web Validate
 */
export let validateAPI = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(conexion.URL_WS + ws_api.EP_VALIDAR_API, {})
      .then(response => {
        if (response) {
          if (response.data.appVersion == null) {
            reject("Hubo un error dentro del API Validate (Web Service).");
          } else {
            resolve(response);
          }
        }
      })
      .catch(error => {
        reject("El sistema se encuentra cerrado. Intente más tarde.");
      });
  });
};

/**
 * Consume servicio web Login
 * @param {json con usuario y password} user
 */
export let login = user => {
  return new Promise((resolve, reject) => {
    axios
      .post(conexion.URL_WS + ws_api.EP_SESION, user)
      .then(response => {
        if (response) {
          if (!response.data.logueado) {
            reject("El nombre de usuario o la contraseña son incorrectos");
          } else {
            resolve(response.data);
          }
        }
      })
      .catch(error => {
        reject("Error en el sistema: " + error.message);
      });
  });
};
