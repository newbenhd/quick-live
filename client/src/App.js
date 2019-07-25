import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Landing from "./page/Landing";
import "./sass/index.scss";
import Login from './page/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
