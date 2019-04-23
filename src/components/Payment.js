import React, { Component } from "react";
import Header from "./Header";
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


                <nav className="navbar navbar-expand navbar-light app">


                    <div class="collapse navbar-collapse">

                    </div>

                    <a class="navbar-brand mx-auto" href="#"><div id="logo"><img src={movil} /></div></a>


                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="img-profile rounded-circle" src={icon} />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Cambiar Contraseña
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Probar impresora
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Cerrar Sesión
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>











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


            </div >

        );
    }
}

export default Payment;
