import React, { Component } from "react";

import payment from "../img/registrarPago.png";
import invoice from "../img/reimpFactura.png";
import report from "../img/reportePagos.png";


import "../css/Payment.css";


class Payment extends Component {


    render(){
        return (
           
<div>

    <div className="navbar navbar-default navbar-fixed-top app" >
      <div className="container">
        <div className="navbar-header">
         
          <a className="navbar-brand" href="#">Project name</a>
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
        <div className="container">
            <div className="row">
                <div className="col-sm-4"> <img src={payment}  /></div>
                <div className="col-sm-4"> <img src={invoice}  /></div>
                <div className="col-sm-4"> <img src={report}  /></div>
            </div>

        <p className="text-muted">Place sticky footer content here.</p>
      </div>
    </footer>


</div>

        );
    }
}

export default Payment;
