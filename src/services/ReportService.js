import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export let buscarPagos = (fecha, idpunto) => {
  return new Promise((resolve, reject) => {
    axios
      .get(conexion.URL_WS + ws_api.EP_REPORTE + +fecha + "/" + idpunto)
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
