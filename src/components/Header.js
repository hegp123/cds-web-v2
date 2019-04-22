import React, { Component } from "react";
import cdsMovil from "../img/cdsMovil.png";
import appIconMore from "../img/appIconMore.png";
import "../css/Header.css";

export default class Header extends Component {
  render() {
    return (
      <div className="navbar navbar-default navbar-fixed-top app">
        <div className="container" style={{ display: "inline" }}>
          <div className="navbar-header">
            <div className="">
              <img src={cdsMovil} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*
<div className="row">
<div className="col-sm-11">
  <img src={cdsMovil} />
</div>
<div className="col-sm-1, pull-right">
  <img src={appIconMore} />
</div>
</div>
<div class="title title-center header-item"></div>*/
