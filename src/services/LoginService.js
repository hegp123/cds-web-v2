import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

/**
 * Consume servicio web Validate
 */
export let validateAPI = () => {
  return new Promise((resolve, reject) => {
    axios.post(conexion.URL_WS + ws_api.EP_VALIDAR_API, {}).then(response => {
      if (response) {
        if (response.data.appVersion == null) {
          reject("Hubo un error en el API, pero el api no muestra nada :( ");
        } else {
          resolve(response);
        }
      }
    });
  });
};

/**
 * Consume servicio web Login
 * @param {json con usuario y password} user
 */
export let login = user => {
  return new Promise((resolve, reject) => {
    axios.post(conexion.URL_WS + ws_api.EP_SESION, user).then(response => {
      if (response) {
        if (!response.data.logueado) {
          reject("No se pudo loguear :( ");
        } else {
          resolve(response.data);
        }
      }
    });
  });
};
