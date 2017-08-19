import Button from "material-ui/Button";
@inject("live", "user")
@observer
export default class liveTest extends React.Component {
  render() {
    let live = this.props.live;
    return (
      <div>
        <h1>
          {live.status}
        </h1>
        <form style={{ margin: "1em" }}>
          <Button onClick={live.subLive} raised color="primary" style={{ marginRight: "1em" }}>
            Đăng ký
          </Button>

          <Button onClick={live.closeLive} raised color="accent">
            Hủy Đăng ký
          </Button>
        </form>

        <br />
        {live.status === "open" &&
          <Button onClick={live.createTest} raised color="primary">
            Test
          </Button>}
      </div>
    );
  }
}
