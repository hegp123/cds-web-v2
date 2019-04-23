import React, { Component } from "react";

import payment from "../img/registrarPago.png";
import invoice from "../img/reimpFactura.png";
import report from "../img/reportePagos.png";


import movil from "../img/cdsMovil.png";
import icon from "../img/appIconMore.png";


import "../css/Payment.css";


class Payment extends Component {


    render() {
        return (

            <div>

                <div className="app" >
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-11">
                                <img src={movil} />
                            </div>
                            <div className="col-sm-1">
                                <img src={icon} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="navbar navbar-default navbar-fixed-top subHeader" >
                    <div className="navbar-header">
                        <div className="container">
                            Registrar pago
                         </div>
                    </div>
                </div>




                <div className="container, containerFmb">
                    <div className="page-header">
                        <h1>Sticky footer with fixed navbar</h1>
                    </div>
                    <p className="lead">Pin a fixed-height footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS. A fixed navbar has been added with <code>padding-top: 60px;</code> on the <code>body > .container</code>.</p>
                    <p>Back to <a href="../sticky-footer">the default sticky footer</a> minus the navbar.</p>
                </div>

                <footer>
                    <div className="container, footerMenu">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="form-group">

                                    <img src={payment} />
                                    <div className="textEnable">Registrar pago</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">

                                    <img src={report} />
                                    <div className="textEnable">Reporte de pagos</div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">

                                    <img src={invoice} />
                                    <div className="textEnable">Reimprimir orden</div>
                                </div>
                            </div>
                        </div>


                    </div>
                </footer>


            </div>

        );
    }
}

export default Payment;
