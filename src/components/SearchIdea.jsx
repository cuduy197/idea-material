import Input from "material-ui/Input/Input";
import Icon from "material-ui/Icon";

@inject("idea")
@observer
export default class SearchIdea extends React.Component {
  render() {
    let { searchIdea } = this.props.idea;
    return (
      <div className="">
        <Icon style={{ padding: "0 10px 0 0" }}>search</Icon>
        <Input
          onChange={e => searchIdea(e.target.value)}
          placeholder="Tìm kiếm"
          style={{ color: "white", margin: "0 10px 0 0" }}
        />
      </div>
    );
  }
}
