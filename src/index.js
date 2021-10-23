
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//IMPORT DOTENV
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.10.0";
import Login from "views/AuthView/Login";
import Register from "views/AuthView/Register";
import { subDomain } from "util/Subdomain";

ReactDOM.render(
  <BrowserRouter
  basename={subDomain}
  >
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
