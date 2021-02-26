import React, { Component } from "react";

class Product extends Component {
  state = {};
  render() {
    console.log(this.props.location);

    return (
      <div>
        <h1> product ke {this.props.match.params.bebas}</h1>
      </div>
    );
  }
}

export default Product;
