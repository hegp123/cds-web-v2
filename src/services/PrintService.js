import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export const PrintService = {
  buscarFactura: (factura, puntoReca, idRecaudador) => {
    return buscarFactura(factura, puntoReca, idRecaudador);
  }
};

export default PrintService;

let buscarFactura = (factura, puntoReca, idRecaudador) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        conexion.URL_WS +
          ws_api.EP_FACTURAS +
          factura +
          "/" +
          puntoReca +
          "/" +
          idRecaudador
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
