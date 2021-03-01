import React, { Component } from "react";
// import Header from "../components/Header";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import ModalComp from "./../components/Modal";
import Axios from "axios";
class Home extends Component {
  state = {
    isLogin: false,
    users: [],
    role: ["admin", "user"],
    usernameInp: "",
    emailInp: "",
    roleInp: "",
    indexdelete: -1,
    indexEdit: -1,
    EditData: {
      id: 0,
      username: "",
      email: "",
      role: "",
    },

    products: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
    modal: false,
    editmodal: false,
  };

  // * component didmount untuk fethching data
  fethcingdata = () => {
    Axios.get(`http://localhost:5000/users`)
      .then((res) => {
        console.log(res);
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
        toast.error("internal server error");
      });
  };

  componentDidMount() {
    this.fethcingdata();
  }

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
              <button
                className="btn btn-danger mx-2"
                onClick={() => this.onYesClick(val.id)}
              >
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

  renderProducts = () => {
    return this.state.products.map((val) => {
      return (
        <Link
          key={val.id}
          className="mx-4"
          to={{ pathname: `/product/` + val.id, state: { category: "dino" } }}
        >
          <button className="btn btn-success">{val.id}</button>
        </Link>
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
    const { roleInp, usernameInp, emailInp } = this.state;
    if (usernameInp && emailInp && roleInp) {
      let data = {
        username: usernameInp,
        email: emailInp,
        role: roleInp,
        password: "1234",
      };
      Axios.post(`http://localhost:5000/users`, data)
        .then((res1) => {
          console.log("post", res1);
          Axios.get(`http://localhost:5000/users`)
            .then((res) => {
              console.log(res);
              this.setState({
                users: res.data,
                roleInp: "",
                usernameInp: "",
                emailInp: "",
                modal: false,
              });
            })
            .catch((err) => {
              console.log(err);
              toast.error("internal server error");
            });
        })
        .catch((err) => {
          console.log(err);
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

  onAddModalClick = () => {
    this.setState({ modal: true });
  };

  onDeleteClick = (index) => {
    this.setState({ indexdelete: index });
  };
  onCancelClick = () => {
    this.setState({ indexdelete: -1 });
  };
  onYesClick = (id) => {
    // const { users, indexdelete } = this.state;
    // let usersData = users;
    // usersData.splice(indexdelete, 1);
    Axios.delete(`http://localhost:5000/users/${id}`)
      .then((res1) => {
        console.log(res1);
        Axios.get(`http://localhost:5000/users`)
          .then((res) => {
            console.log(res);
            this.setState({ users: res.data, indexdelete: -1 });
          })
          .catch((err) => {
            console.log(err);
            toast.error("internal server error");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onEditClick = (index) => {
    let EditData = this.state.EditData;
    let users = this.state.users;
    EditData = {
      ...EditData,
      id: users[index].id,
      username: users[index].username,
      email: users[index].email,
      role: users[index].role,
    };
    this.setState({ indexEdit: index, EditData: EditData, editmodal: true });
  };

  onCancelEditClick = () => {
    this.setState({
      EditData: {
        username: "",
        email: "",
        role: "",
      },
      indexEdit: -1,
      editmodal: false,
    });
  };

  onSaveEditClick = () => {
    // * dengan destructuring
    // const { EditData, users, indexEdit } = this.state;
    // const { username, email, role } = EditData;
    // !tanpa destructring
    let username = this.state.EditData.username;
    let id = this.state.EditData.id;
    let email = this.state.EditData.email;
    let role = this.state.EditData.role;
    // let users = this.state.users;
    // let indexEdit = this.state.indexEdit;
    // *======================= *//
    if (username && email && role && id) {
      let data = {
        username: username,
        email: email,
        role: role,
      };

      Axios.patch(`http://localhost:5000/users/${id}`, data)
        .then((res1) => {
          console.log(res1.data);
          Axios.get(`http://localhost:5000/users`)
            .then((res) => {
              console.log(res);
              this.setState({
                users: res.data,
                indexEdit: -1,
                editmodal: false,
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
            })
            .catch((err) => {
              console.log(err);
              toast.error("internal server error");
            });
        })
        .catch((err) => {
          console.log(err);
        });
      // this.setState({
      //   users: usersdata,
      //   indexEdit: -1,
      //   editmodal: false,
      // });
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

  onLoginClick = () => {
    if (this.state.users.length > 2) {
      this.setState({ isLogin: true });
    } else {
      toast("data harus lebih dari 2");
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  toggleEdit = () => {
    this.setState({ editmodal: !this.state.editmodal });
  };
  // * input buat edit
  // * nanti displice seperti biasanya

  onUserSearchChange = (e) => {
    Axios.get(`http://localhost:5000/users?username_like=${e.target.value}`)
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  onroleChange = (e) => {
    if (e.target.value === "All") {
      Axios.get(`http://localhost:5000/users`)
        .then((res) => {
          this.setState({ users: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(`http://localhost:5000/users?role=${e.target.value}`)
        .then((res) => {
          this.setState({ users: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const { isLogin } = this.state;

    if (isLogin) {
      return <Redirect to="/corona" />;
    }
    return (
      <div>
        {/* <Header /> */}
        <ModalComp
          isOpen={this.state.modal}
          toggle={this.toggle}
          title={"Add Users"}
          saveData={this.onAddClick}
        >
          <input
            name="usernameInp"
            type="text"
            placeholder="username"
            className="form-control my-2"
            value={this.state.usernameInp}
            onChange={this.onInputChage}
          />
          <input
            name="emailInp"
            type="email"
            placeholder="email"
            className="form-control my-2"
            value={this.state.emailInp}
            onChange={this.onInputChage}
          />
          <select
            name="roleInp"
            onChange={this.onInputChage}
            value={this.state.roleInp}
            className="form-control my-2"
          >
            <option hidden value="">
              pilih role
            </option>
            {this.renderRole()}
          </select>
        </ModalComp>
        <ModalComp
          isOpen={this.state.editmodal}
          toggle={this.toggleEdit}
          title={`Edit Users  ${
            this.state.indexEdit === -1
              ? ""
              : this.state.users[this.state.indexEdit].username
          }`}
          saveData={this.onSaveEditClick}
          Cancel={this.onCancelEditClick}
          Edit={true}
        >
          <input
            name="username"
            type="text"
            placeholder="username"
            className="form-control"
            value={this.state.EditData.username}
            onChange={this.onInputEditChage}
          />

          <input
            name="email"
            type="email"
            placeholder="email"
            className="form-control"
            value={this.state.EditData.email}
            onChange={this.onInputEditChage}
          />

          <select
            name="role"
            onChange={this.onInputEditChage}
            value={this.state.EditData.role}
            className="form-control"
          >
            {this.renderRole()}
          </select>
        </ModalComp>

        <div className="pt-5 px-5 mx-5">
          {/* <button className="btn btn-primary" onClick={this.onLoginClick}>
            Login
          </button> */}
          <input
            placeholder="search user"
            className="form-control"
            onChange={this.onUserSearchChange}
          />
          <select className="form-control my-2" onChange={this.onroleChange}>
            <option hidden value="">
              pilih role
            </option>
            {this.renderRole()}
            <option value="All">All</option>
          </select>
          <button className="btn btn-primary">Submits</button>
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
            <tbody>{this.renderUsers()}</tbody>
          </Table>
          <button onClick={this.onAddModalClick} className="btn btn-success">
            add
          </button>
          {/* {this.renderProducts()} */}
        </div>
      </div>
    );
  }
}

export default Home;
