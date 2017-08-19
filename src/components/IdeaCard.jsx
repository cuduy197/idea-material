import React, { Component } from "react";
import Parse from "parse";
import { withStyles } from "material-ui/styles";
import classnames from "classnames";
import Card, { CardHeader, CardMedia, CardContent, CardActions } from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import ShareIcon from "material-ui-icons/Share";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Button from "material-ui/Button";
import LightbulbOutline from "material-ui-icons/LightbulbOutline";
import ModeEditIcon from "material-ui-icons/ModeEdit";
import Clear from "material-ui-icons/Clear";

const styles = theme => ({
  card: {},

  media: {
    height: 194
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "white"
  },
  flexGrow: {
    flex: "1 1 auto"
  }
});

@inject("user")
@observer
@withStyles(styles)
class RecipeReviewCard extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const classes = this.props.classes;
    let { userData } = this.props.user;
    return (
      <div>
        <Card className="idea-card">
          <CardHeader
            avatar={<Avatar src={this.props.avatar} className={classes.avatar} />}
            subheader={
              <div>
                <span>
                  {this.props.author}
                </span>
                <br />
                <span>
                  {this.props.time}
                </span>
              </div>
            }
            title={
              Parse.User.current() !== null &&
              this.props.author_id === Parse.User.current().id &&
              <div>
                <IconButton
                  title="Bấm để xóa ý tưởng"
                  onClick={this.props.delete}
                  color="accent"
                  style={{ float: "right" }}>
                  <Clear />
                </IconButton>
                <IconButton
                  title="Bấm để sửa ý tưởng"
                  onClick={this.props.edit}
                  color="primary"
                  style={{ float: "right" }}>
                  <ModeEditIcon />
                </IconButton>
              </div>
            }
          />
          {/* <CardMedia
            className={classes.media}
            image="https://ae01.alicdn.com/kf/HTB1BOhuKVXXXXb6XFXXq6xXFXXXV/New-Arrival-Yeah-font-b-Sweet-b-font-font-b-Smile-b-font-Emoji-Pillow-Cute.jpg"
            title="Contemplative Reptile"
          /> */}
          <CardContent>
            <Typography type="headline" style={{ fontFamily: "Comfortaa" }}>
              {this.props.title.normalize()}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <Button title="+1 ý tưởng" onClick={this.props.addBulb} dense aria-label="Add to favorites">
              {this.props.bulbs}
              <LightbulbOutline style={{ color: "rgb(241,196,15)" }} />
            </Button>
            {/* <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton> */}
            <div className={classes.flexGrow} />
            <Button onClick={this.handleExpandClick}>
              Xem thêm
              <ExpandMoreIcon
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
              />
            </Button>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              {this.props.content
                ? <div dangerouslySetInnerHTML={{ __html: this.props.content.normalize() }} />
                : <span>Không có mô tả</span>}
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default RecipeReviewCard;
