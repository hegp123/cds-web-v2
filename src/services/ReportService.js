import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export let buscarPagos = fechaParameter => {
  return new Promise((resolve, reject) => {
    axios
      .post(conexion.URL_WS + ws_api.EP_REPORTE, fechaParameter)
      .then(response => {
        if (response) {
          var arrayObj = convertJsonReposr(response.data);
          resolve(arrayObj);
        } else {
          reject(null);
        }
      })
      .catch(error => {
        reject("error");
      });
  });
};

function convertJsonReposr(data) {
  let arrayObj = new Array();
  var obj = null;

  for (var i = 0; i < data.PagosDto.CreditosDto.length; i++) {
    obj = new Object();
    obj.factura = data.PagosDto.CreditosDto[i].DocumentoFI;
    obj.valor = data.PagosDto.CreditosDto[i].ValorPagado;
    obj.agencia = data.PagosDto.NombreCDS;
    obj.estado = "1";
    arrayObj.push(obj);
  }
  return arrayObj;
}
