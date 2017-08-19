import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Button from "material-ui/Button";
import Input from "material-ui/Input/Input";
import Menu, { MenuItem } from "material-ui/Menu";
import Icon from "material-ui/Icon";
import Avatar from "material-ui/Avatar";
import Drawer from "#/Drawer";
import Hidden from "material-ui/Hidden";
//component
import SearchIdea from "#/SearchIdea";
@inject(["user"])
@observer
class AccountMenu extends Component {
  state = {
    anchorEl: undefined,
    open: false
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    let { isLogin, logout, userData } = this.props.user;

    return (
      <div>
        <Button color="contrast" onClick={this.handleClick}>
          <Avatar style={{ margin: "0 10px 0 0" }} src={userData.photoUrl} />
          Tài khoản
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}>
          <MenuItem
            onClick={() => {
              this.setState({ open: false });
              logout();
            }}>
            Đăng xuất <Icon style={{ paddingLeft: "15px" }}>cloud_off</Icon>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

@inject("user", "idea")
@observer
export default class NavBar extends Component {
  state = {
    openDrawer: false
  };
  render() {
    let { isLogin, login } = this.props.user;
    let { openDrawer, showDrawer, closeDrawer, searchIdea } = this.props.idea;

    return (
      <div className="Navbar">
        <AppBar
          position="static"
          style={{
            backgroundColor: isLogin === null ? "indigo" : isLogin ? "purple" : "indigo"
          }}>
          <Toolbar>
            {isLogin
              ? <div className="animated fadeInLeft">
                  <AccountMenu />
                </div>
              : <Link to="/">
                  <div className="animated fadeIn">
                    <Button color="contrast">
                      <Icon style={{ padding: "0 10px 0 0" }}>home</Icon> Trang chủ
                    </Button>
                  </div>
                </Link>}

            {isLogin === null
              ? <div />
              : isLogin
                ? <div className="Navbar content animated fadeInDown">
                    <Hidden only={["sm", "xs"]}>
                      <SearchIdea />
                    </Hidden>
                    <Button onClick={() => showDrawer()} style={{ backgroundColor: "white" }}>
                      <Icon style={{ padding: "0 10px 0 0" }}>note_add</Icon> Thêm ý tưởng
                    </Button>
                  </div>
                : <div className="Navbar content animated fadeInDown">
                    <Button onClick={() => login()} raised color="accent">
                      <Icon style={{ padding: "0 10px 0 0" }}>input</Icon>
                      Đăng nhập
                    </Button>
                  </div>}
          </Toolbar>
          <Drawer open={openDrawer} onRequestClose={() => closeDrawer()} />
        </AppBar>
      </div>
    );
  }
}
