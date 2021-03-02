import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LoginAction } from "./../redux/actions";
class Login extends Component {
  state = {
    inputData: {
      username: "",
      email: "",
    },
  };

  onInputChange = (e) => {
    let inputdata = this.state.inputData;
    inputdata[e.target.name] = e.target.value;
    this.setState({ inputData: inputdata });
  };

  onSubmitLog = (e) => {
    e.preventDefault();
    var data = {
      id: 10, //id terserah
      ...this.state.inputData,
    };
    this.props.LoginAction(data);
  };

  render() {
    if (this.props.DataUser.islogin) {
      return <Redirect to="/" />;
    }
    return (
      <div className="d-flex justify-content-center align-items-center ">
        <div className="border p-5">
          <h1>Login</h1>
          <form onSubmit={this.onSubmitLog}>
            <input
              type="text"
              className="form-control my-2"
              placeholder="username"
              name="username"
              onChange={this.onInputChange}
            />
            <input
              type="email"
              name="email"
              className="form-control my-2"
              placeholder="email"
              onChange={this.onInputChange}
            />
            <button type="submit" className="btn-primary btn my-2">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const MapStatetoProps = (state) => {
  return {
    DataUser: state.User,
  };
};

export default connect(MapStatetoProps, { LoginAction })(Login);
