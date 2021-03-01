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

class Home2 extends Component {
  state = {
    data: [
      {
        foto:
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        judul: "Makan makan",
        caption: "makan teratur",
      },
      {
        foto:
          "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_potassium_foods_other.jpg?resize=750px:*",
        judul: "Makan makan",
        caption: "makan teratur",
      },
    ],
  };

  //*  cara pertama tanpa component
  //   renderCard = () => {
  //     const { classes } = this.props;

  //     return this.state.data.map((val, index) => {
  //       return (
  //         <div className="col-md-3" key={index}>
  //            <Card style={{ backgroundColor: "khaki" }} variant="outlined">
  //             <CardMedia
  //               className={classes.media}
  //               image={val.foto}
  //               title="Paella dish"
  //             />
  //             <CardContent>
  //               <Typography variant="h5" component="h2">
  //                 {val.judul}
  //               </Typography>

  //               <Typography variant="body2" color="textSecondary" component="p">
  //                 User1
  //                 <br />
  //                 {val.caption}
  //               </Typography>
  //             </CardContent>
  //             <CardActions>
  //               <IconButton className="heart">
  //                 <BsFillHeartFill />
  //               </IconButton>
  //               <IconButton className="share">
  //                 <BiPaperPlane />
  //               </IconButton>
  //             </CardActions>
  //           </Card>
  //         </div>
  //       );
  //     });
  //   };

  // * cara dengan component
  renderCard = () => {
    return this.state.data.map((val, index) => {
      return (
        <div className="col-md-3" key={index}>
          <Card foto={val.foto} judul={val.judul} caption={val.caption} />
        </div>
      );
    });
  };

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <div className="row">{this.renderCard()}</div>
        <div className=" mt-5 d-flex flex-column justify-content-center align-items-center">
          <h1>Tambah Data</h1>
          <div>
            <BsPlusCircle style={{ fontSize: "3em", fontWeight: "700" }} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home2);
