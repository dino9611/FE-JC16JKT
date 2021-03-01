import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { styles } from "./materialUi";
import { AiTwotoneEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";

class Cardcomp extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <Card style={{ backgroundColor: "khaki" }} variant="outlined">
        <CardMedia
          className={classes.media}
          image={this.props.foto}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.judul}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            User1
            <br />
            {this.props.caption}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={this.props.delete} className="heart">
            <BiTrash />
          </IconButton>
          <IconButton onClick={this.props.edit} className="share">
            <AiTwotoneEdit />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Cardcomp);
