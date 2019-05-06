import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export let cambiarClave = (
  clave,
  nuevaClave,
  confirmarClave,
  idRecaudador,
  login
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        conexion.URL_WS +
          ws_api.EP_CLAVE +
          +clave +
          "/" +
          nuevaClave +
          "/" +
          confirmarClave +
          "/" +
          idRecaudador +
          "/" +
          login
      )
      .then(response => {
        if (response) {
          resolve(response.data);
        } else {
          reject(null);
        }
      })
      .catch(error => {
        reject("error");
      });
  });
};
