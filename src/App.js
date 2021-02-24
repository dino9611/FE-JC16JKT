import React, { Component } from "react";
import Header from "./components/Header";
import "./App.css";
import { Table } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// * crud didalam state
// * karena pake yarn npm install itu sama dengan yarn add npm install == yarn add

class App extends Component {
  state = {
    users: [
      {
        username: "dino",
        email: "dinorahman@ymail.com",
        role: "user",
      },
      {
        username: "Alghi",
        email: "alghi@google.com",
        role: "admin",
      },
    ],
    role: ["admin", "user"],
    usernameInp: "",
    emailInp: "",
    roleInp: "",
    indexdelete: -1,
    indexEdit: -1,
    EditData: {
      username: "",
      email: "",
      role: "",
    },
  };

  // renderUsers = this.state.users.map((val, index) => {
  //   return (
  //     <tr>
  //       <td>{index + 1}</td>
  //       <td>{val.username}</td>
  //       <td>{val.email}</td>
  //       <td>
  //         <button className="btn btn-primary mx-2">Edit</button>
  //         <button className="btn btn-danger mx-2">Delete</button>
  //       </td>
  //     </tr>
  //   );
  // });

  // * boleh cara yang seperti dibawah ini untuk merender data
  // * digunakan pada saat membutuhkan logic

  renderUsers = () => {
    return this.state.users.map((val, index) => {
      if (index === this.state.indexdelete) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{val.username}</td>
            <td>{val.email}</td>
            <td>{val.role}</td>
            <td>
              <button className="btn btn-danger mx-2" onClick={this.onYesClick}>
                Delete
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={this.onCancelClick}
              >
                No
              </button>
            </td>
          </tr>
        );
      } else if (index === this.state.indexEdit) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input
                name="username"
                type="text"
                placeholder="username"
                className="form-control"
                value={this.state.EditData.username}
                onChange={this.onInputEditChage}
              />
            </td>
            <td>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="form-control"
                value={this.state.EditData.email}
                onChange={this.onInputEditChage}
              />
            </td>
            <td>
              <select
                name="role"
                onChange={this.onInputEditChage}
                value={this.state.EditData.role}
                className="form-control"
              >
                {this.renderRole()}
              </select>
            </td>
            <td>
              <button
                className="btn btn-success mx-2"
                onClick={this.onSaveEditClick}
              >
                Save
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={this.onCancelEditClick}
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.username}</td>
          <td>{val.email}</td>
          <td>{val.role}</td>
          <td>
            <button
              className="btn btn-primary mx-2"
              onClick={() => this.onEditClick(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => this.onDeleteClick(index)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  renderRole = () => {
    return this.state.role.map((val, index) => {
      return (
        <option key={index} value={val}>
          {val}
        </option>
      );
    });
  };

  // ? Create Read Update Delete == CRUD

  onUsernameChange = (event) => {
    this.setState({ usernameInp: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ emailInp: event.target.value });
  };
  // * bisa pake onchange yang atas atau yang bawah
  // * lebih prefer yang bawah karena kodingnya lebih sedikit
  onInputChage = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };
  // * cara mendapatkan input ada 2 metode :
  // * 1. dengan menggunakan onchange
  // * 2. dengan ref class pake createRef
  onInputEditChage = (event) => {
    let Editdata = this.state.EditData;
    Editdata[event.target.name] = event.target.value;
    this.setState({ EditData: Editdata });
  };
  onAddClick = () => {
    // const role = this.state.roleInp;
    // const username = this.state.usernameInp;
    // const email = this.state.emailInp;
    // const users = this.state.users;
    const { roleInp, usernameInp, emailInp, users } = this.state;
    if (usernameInp && emailInp && roleInp) {
      let data = {
        username: usernameInp,
        email: emailInp,
        role: roleInp,
      };
      let usersdata = users;
      usersdata.push(data);
      this.setState({
        users: usersdata,
        roleInp: "",
        usernameInp: "",
        emailInp: "",
      });
    } else {
      toast.error("input harus diisi bro", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  onDeleteClick = (index) => {
    this.setState({ indexdelete: index });
  };
  onCancelClick = () => {
    this.setState({ indexdelete: -1 });
  };
  onYesClick = () => {
    const { users, indexdelete } = this.state;
    let usersData = users;
    usersData.splice(indexdelete, 1);
    this.setState({ users: usersData, indexdelete: -1 });
  };

  onEditClick = (index) => {
    let EditData = this.state.EditData;
    let users = this.state.users;
    EditData = {
      ...EditData,
      username: users[index].username,
      email: users[index].email,
      role: users[index].role,
    };
    this.setState({ indexEdit: index, EditData: EditData });
  };

  onCancelEditClick = () => {
    this.setState({
      EditData: {
        username: "",
        email: "",
        role: "",
      },
      indexEdit: -1,
    });
  };

  onSaveEditClick = () => {
    // * dengan destructuring
    // const { EditData, users, indexEdit } = this.state;
    // const { username, email, role } = EditData;
    // !tanpa destructring
    let username = this.state.EditData.username;
    let email = this.state.EditData.email;
    let role = this.state.EditData.role;
    let users = this.state.users;
    let indexEdit = this.state.indexEdit;
    // *======================= *//
    if (username && email && role) {
      let data = {
        username: username,
        email: email,
        role: role,
      };
      let usersdata = users;
      usersdata.splice(indexEdit, 1, data);
      this.setState({
        users: usersdata,
        indexEdit: -1,
      });

      toast.success("berhasil edit ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.setState({
        EditData: {
          username: "",
          email: "",
          role: "",
        },
        indexEdit: -1,
      });
      toast.error("Gak jadi Edit", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // * input buat edit
  // * nanti displice seperti biasanya
  render() {
    return (
      <div>
        <Header />

        <div className="pt-5 px-5 mx-5">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderUsers()}
              <tr>
                <td>#</td>
                <td>
                  <input
                    name="usernameInp"
                    type="text"
                    placeholder="username"
                    className="form-control"
                    value={this.state.usernameInp}
                    onChange={this.onInputChage}
                  />
                </td>
                <td>
                  <input
                    name="emailInp"
                    type="email"
                    placeholder="email"
                    className="form-control"
                    value={this.state.emailInp}
                    onChange={this.onInputChage}
                  />
                </td>
                <td>
                  <select
                    name="roleInp"
                    onChange={this.onInputChage}
                    value={this.state.roleInp}
                    className="form-control"
                  >
                    <option hidden value="">
                      pilih role
                    </option>
                    {this.renderRole()}
                  </select>
                </td>
                <td>
                  <button onClick={this.onAddClick} className="btn btn-success">
                    add
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
