import axios from "axios";
import { conexion, ws_api } from "../utils/Parameters";

export let buscarCredito = creditSearch => {
  return new Promise((resolve, reject) => {
    axios
      .post(conexion.URL_WS + ws_api.EP_CREDITOS_CC, creditSearch)
      .then(response => {
        if (response) {
          if (!response.data) {
            reject("No se encuentran datos");
          } else {
            //Preguntar como se van a llamar la lista CreditoClientesDto dentro del response
            var credits = convertJsonSearch(response.data);
            resolve(credits);
          }
        }
      })
      .catch(error => {
        reject("Error en el sistema: " + error.message);
      });
  });
};

function convertJsonSearch(data) {
  var credits = new Array();
  for (var i = 0; i < data.CreditoClientesDto.length; i++) {
    var credit = new Object();
    credit.nombreCliente = data.NombreCompleto;
    credit.cedulaCliente = data.NroDocumento;
    credit.codigoCredito = data.CreditoClientesDto[i].NroCredito;
    credit.idproducto = data.CreditoClientesDto[i].Producto;
    credit.cuotaCredito = data.CreditoClientesDto[i].ValorPagar;
    credit.vencimiento = data.CreditoClientesDto[i].FechaVencimiento;
    credits.push(credit);
  }
  return credits;
}

/*
export let buscarPorSeleccion = (
  credito,
  cuota,
  idproducto,
  tac,
  porVencer
) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        conexion.URL_WS +
          ws_api.EP_CREDITOS_SELECCION +
          credito +
          "/" +
          cuota +
          "/" +
          idproducto +
          "/" +
          tac +
          "/" +
          porVencer
      )
      .then(response => {
        if (response) {
          if (!response.data) {
            reject("creo que aca nunca se va a meter");
          } else {
            resolve(response.data);
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export let infoPagosCredito = cuenta => {
  return new Promise((resolve, reject) => {
    axios
      .get(conexion.URL_WS + ws_api.EP_CREDITOS_INFO + cuenta)
      .then(response => {
        if (response) {
          if (!response.data) {
            reject("creo que aca nunca se va a meter");
          } else {
            resolve(response.data);
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
*/

export let pagarCredito = pago => {
  return new Promise((resolve, reject) => {
    axios
      .post(conexion.URL_WS + ws_api.EP_CREDITOS_PAGAR, pago)
      .then(response => {
        if (response) {
          if (!response.data) {
            reject("creo que aca nunca se va a meter");
          } else {
            var payment = convertJsonPayment(response.data);
            resolve(payment);
          }
        }
      })
      .catch(error => {
        reject("Error en el sistema: " + error.messageerror);
      });
  });
};

function convertJsonPayment(data) {
  var payment = new Object();
  let moment = require("moment");
  payment.numeroFactura = data.NumFactura;
  payment.cliente = data.NombreCompleto;
  payment.cedulaCliente = data.NroDocumento;
  payment.codigoCredito = data.NroCredito;
  payment.agencia = data.NombreOficina;
  payment.total = data.Valortotal;
  payment.fecha = moment(new Date()).format("DD/MM/YYYY");
  return payment;
}
/*
export let buscarPorNombre = nombre => {
  return new Promise((resolve, reject) => {
    axios
      .get(conexion.URL_WS + ws_api.EP_CREDITOS_NOMBRE + nombre)
      .then(response => {
        if (response) {
          if (!response.data) {
            reject("problemas con el buscar nombre");
          } else {
            resolve(response.data);
          }
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
*/
// function buscarPorCredito(credito, idPunto, purePrejuridico) {
//     return $http.get(URL_WS + EP_CREDITOS_CREDITO + credito + "/" + idPunto);
// }

// function buscarPorNombre(nombre) {
//     return $http.get(URL_WS + EP_CREDITOS_NOMBRE + nombre);
// }
