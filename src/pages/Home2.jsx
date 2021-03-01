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

const MySwal = withReactContent(Swal);

class Home2 extends Component {
  state = {
    data: [
      {
        foto:
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        judul: "Makan makan",
        caption: "makan teratur aja",
      },
      {
        foto:
          "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_potassium_foods_other.jpg?resize=750px:*",
        judul: "Makan makan1",
        caption: "makan teratur",
      },
    ],
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

  renderCard = () => {
    return this.state.data.map((val, index) => {
      return (
        <div className="col-md-3" key={index}>
          <Card
            foto={val.foto}
            judul={val.judul}
            caption={val.caption}
            delete={() => this.deletedata(index)}
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
  deletedata = (index) => {
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
        let data = this.state.data;
        data.splice(index, 1);
        this.setState({ data: data });
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  onAddDataClick = () => {
    let data = this.state.data;
    data.push(this.state.AddData);
    this.setState({ data, modalAdd: false });
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
    this.setState({
      indexEdit: index,
      modalEdit: true,
      Editdata: defaultvalue,
    });
  };
  onCancelEditClick = () => {
    this.setState({
      indexEdit: -1,
      modalEdit: false,
    });
  };
  onSaveEditClick = () => {
    let editdata = this.state.Editdata;
    let index = this.state.indexEdit;
    let data = this.state.data;
    data.splice(index, 1, editdata);
    this.setState({ data: data, indexEdit: -1, modalEdit: false });
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
