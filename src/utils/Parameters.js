/**************************************************
 * Parámetros generales
 **************************************************/
export const general = {
  NOMBRE_APP: "CDS Web",
  VERSION_APP: "2.0"
};

/**************************************************
 * Parámetros de conexión Servicio Web
 **************************************************/
export const conexion = {
  URL_WS: "http://localhost:8081/cdsws/apiv1" //local
  //URL_WS : "https://cdspruebas.app.fundaciondelamujer.com:8085/cdsws/apiv1" //pruebas
  //este URL_WS2 no es necesario, en el proyecto anterior lo usaban para cuando fallaba al hacer login por URL_WS, entonces intentaba por este otro
  //ver archivo: LoginCtrl.js linea: 139
};

/**************************************************
 * Métodos del API
 **************************************************/
export const ws_api = {
  EP_CREDITOS_CC: "/creditosdummy/consultar",
  //EP_CREDITOS_CREDITO: "/creditos/credito/",
  //EP_CREDITOS_SELECCION: "/creditos/seleccion/",
  // EP_CREDITOS_NOMBRE: "/creditos/nombre/",
  EP_CREDITOS_PAGAR: "/creditosdummy/pagar",
  // EP_CREDITOS_INFO: "/creditos/info/",
  EP_OTRO: "/otro/consultar",
  EP_PAGAR_OTRO: "/otro/registrar",
  EP_FACTURAS: "/reimprimir/reimprimir",

  EP_REPORTE: "/reporte/obtener/",

  EP_SESION: "/sesion/login",
  EP_CLAVE: "/autenticacion/clave/",
  EP_VALIDAR_API: "/validar/api",
  EP_CLAVE_BLOQUEO: "/autenticacion/bloqueo/",
  EP_CLAVE_BLOQUEO_VAL: "/autenticacion/validarbloqueo/"
};
