import React from "react";
import { Route, Redirect } from "react-router-dom";
import { constants } from "fs";
import { SESSION } from "../utils/Constants";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem(SESSION) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
