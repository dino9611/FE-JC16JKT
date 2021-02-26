import React, { Component } from "react";
import Header from "./components/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Product from "./pages/product";
import Corona from "./pages/corona";
import Home2 from "./pages/Home2";
class App extends Component {
  state = {
    // page: "/",
  };

  // pindahpage = (to) => {
  //   this.setState({ page: to });
  // };

  render() {
    return (
      <div>
        <Header />
        <div className="pt-5 px-5 mx-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/product/:bebas" component={Product} />
            <Route path="/corona" component={Corona} />
            <Route path="/home2" component={Home2} />
          </Switch>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
