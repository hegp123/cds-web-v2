import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export let buscarFactura = factura => {
  return new Promise((resolve, reject) => {
    axios
      .post(conexion.URL_WS + ws_api.EP_FACTURAS, factura)
      .then(response => {
        if (response) {
          let invoiceReturn = convertJSONReport(response.data);
          resolve(invoiceReturn);
        } else {
          reject(null);
        }
      })
      .catch(error => {
        reject("Error en el sistema: " + error.message);
      });
  });
};

function convertJSONReport(data) {
  let invoiceReturn = {
    numeroFactura: data.NumFactura,
    cliente: data.NombreCompleto,
    cedulaCliente: data.NroDocumento,
    codigoCredito: data.NroCredito,
    fecha: data.FechaPago,
    agencia: data.NombreCDS,
    total: data.ValorPagado
  };
  return invoiceReturn;
}
