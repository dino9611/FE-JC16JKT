import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
class About extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h1>ABOUT</h1>
            <Link to="/about/2">ke 2 </Link> <br />
            <Link to="/about/3">ke 3 </Link> <br />
            <Link to="/about">ke awal </Link>
          </div>
          <div className="col-md-6">
            <Switch>
              <Route path="/about" exact>
                <h1>ini awal</h1>
              </Route>
              <Route path="/about/2">
                <h1>ini 2</h1>
              </Route>
              <Route path="/about/3">
                <h1>ini 3</h1>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
