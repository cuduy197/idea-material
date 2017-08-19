import Drawer from "material-ui/Drawer";
import Button from "material-ui/Button";

//form
import IdeaFrom from "#/IdeaFrom";

export default class AppDrawer extends Component {
  render() {
    return (
      <div>
        <Drawer
          anchor={this.props.anchor || "top"}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
          onClick={this.props.click}>
          <IdeaFrom />
        </Drawer>
      </div>
    );
  }
}
