import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export let buscarFactura = factura => {
  return new Promise((resolve, reject) => {
    axios
      .post(conexion.URL_WS + ws_api.EP_FACTURAS, factura)
      .then(response => {
        if (response) {
          let data = response.data;
          let invoiceReturn = {
            numeroFactura: data.DocumentoFI,
            cliente: data.NombreCompleto,
            cedulaCliente: data.NroDocumento,
            codigoCredito: data.NroCredito,
            fecha: data.FechaPago,
            agencia: data.NombreCDS,
            total: data.ValorPagado
          };
          resolve(invoiceReturn);
        } else {
          reject(null);
        }
      })
      .catch(error => {
        reject("error");
      });
  });
};
