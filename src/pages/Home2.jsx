import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import {
  styles,
  // coba
} from "../components/materialUi";
import {
  BsPlusCircle,
  // BsFillHeartFill
} from "react-icons/bs";
// import { BiPaperPlane } from "react-icons/bi";
// import IconButton from "@material-ui/core/IconButton";
import Card from "./../components/Card";
import ModalComp from "./../components/Modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";
const MySwal = withReactContent(Swal);

class Home2 extends Component {
  state = {
    data: [],
    modalAdd: false,
    AddData: {
      foto: "",
      judul: "",
      caption: "",
    },
    modalEdit: false,
    Editdata: {
      foto: "",
      judul: "",
      caption: "",
    },
    indexEdit: -1,
  };

  // fetching data biasanya ada componentDidMount

  componentDidMount() {
    Axios.get("http://localhost:5000/posts")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderCard = () => {
    return this.state.data.map((val, index) => {
      return (
        <div className="col-md-3" key={index}>
          <Card
            foto={val.foto}
            judul={val.judul}
            caption={val.caption}
            delete={() => this.deletedata(val.id, index)}
            edit={() => this.onEditData(index)}
          />
        </div>
      );
    });
  };

  toggle = () => {
    this.setState({ modalAdd: !this.state.modalAdd });
  };
  toggleEdit = () => {
    this.setState({ modalEdit: !this.state.modalEdit, indexEdit: -1 });
  };
  deletedata = (id, index) => {
    console.log(id);
    MySwal.fire({
      title: `Are you sure delete ${this.state.data[index].judul} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:5000/posts/${id}`)
          .then(() => {
            Axios.get("http://localhost:5000/posts")
              .then((res) => {
                this.setState({ data: res.data, modalAdd: false });
                MySwal.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(console.log(err));
          });
      }
    });
  };

  onAddDataClick = () => {
    let adddata = this.state.AddData; //* add data sudah sebuah object
    Axios.post("http://localhost:5000/posts", adddata) //* method post parameter keduanya harus object
      .then(() => {
        Axios.get("http://localhost:5000/posts")
          .then((res) => {
            this.setState({ data: res.data, modalAdd: false });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onInputChage = (e) => {
    let AddData = this.state.AddData;
    AddData[e.target.name] = e.target.value;
    this.setState({ AddData: AddData });
  };
  onInputEditChage = (e) => {
    let Editdata = this.state.Editdata;

    Editdata[e.target.name] = e.target.value;

    this.setState({ Editdata: Editdata });
  };
  onEditData = (index) => {
    let defaultvalue = this.state.data[index];

    let obj = {
      foto: defaultvalue.foto,
      judul: defaultvalue.judul,
      caption: defaultvalue.caption,
    };
    this.setState({
      indexEdit: index,
      modalEdit: true,
      Editdata: obj,
    });
  };
  onCancelEditClick = () => {
    this.setState({
      indexEdit: -1,
      modalEdit: false,
    });
  };
  onSaveEditClick = () => {
    let editdata = this.state.Editdata; //* edit data sudah sebuah object
    let index = this.state.indexEdit;
    let data = this.state.data;
    let id = data[index].id;
    Axios.put(`http://localhost:5000/posts/${id}`, editdata)
      .then(() => {
        Axios.get("http://localhost:5000/posts")
          .then((res) => {
            this.setState({ data: res.data, indexEdit: -1, modalEdit: false });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    // const { classes } = this.props;

    return (
      <div>
        <ModalComp
          isOpen={this.state.modalEdit}
          toggle={this.toggleEdit}
          title={
            this.state.indexEdit == -1
              ? ""
              : "Edit Postingan " + this.state.data[this.state.indexEdit].judul
          }
          saveData={this.onSaveEditClick}
          Cancel={this.onCancelEditClick}
          Edit={true}
        >
          <input
            name="foto"
            type="text"
            placeholder="foto"
            className="form-control my-2"
            value={this.state.Editdata.foto}
            onChange={this.onInputEditChage}
          />
          <input
            name="judul"
            type="text"
            placeholder="judul"
            className="form-control my-2"
            value={this.state.Editdata.judul}
            onChange={this.onInputEditChage}
          />
          <input
            name="caption"
            type="text"
            placeholder="caption"
            className="form-control my-2"
            value={this.state.Editdata.caption}
            onChange={this.onInputEditChage}
          />
        </ModalComp>
        <ModalComp
          isOpen={this.state.modalAdd}
          toggle={this.toggle}
          title={"Add Postingan"}
          saveData={this.onAddDataClick}
        >
          <input
            name="foto"
            type="text"
            placeholder="foto"
            className="form-control my-2"
            value={this.state.AddData.foto}
            onChange={this.onInputChage}
          />
          <input
            name="judul"
            type="text"
            placeholder="judul"
            className="form-control my-2"
            value={this.state.AddData.judul}
            onChange={this.onInputChage}
          />
          <input
            name="caption"
            type="text"
            placeholder="caption"
            className="form-control my-2"
            value={this.state.AddData.caption}
            onChange={this.onInputChage}
          />
        </ModalComp>
        ;<div className="row">{this.renderCard()}</div>
        <div className=" mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1>Tambah Data</h1>
          <div>
            <BsPlusCircle
              onClick={this.toggle}
              className="icon"
              style={{ fontSize: "3em", fontWeight: "700" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home2);
