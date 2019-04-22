import React, { Component } from "react";
import "../css/InputTextFmb.css"


class InputTextFmb extends Component {
    render() {
        return(            
                  
            <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input type="text" className="form-control" placeholder="Search" />
            </div>


          );
        }
}

export default InputTextFmb;

    