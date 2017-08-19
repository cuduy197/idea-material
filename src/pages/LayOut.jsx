@inject("user")
@observer
export default class LayOut extends React.Component {
  render() {
    return (
      <div className="animated fadeIn">
        <h1>LayOut</h1>
        {this.props.user.userData.name}
      </div>
    );
  }
}
