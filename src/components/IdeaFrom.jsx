import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Icon from "material-ui/Icon";

@inject(["idea"])
@observer
export default class IdeaForm extends React.Component {
  render() {
    let { isEdit, input_form, updateData, sendIdea, closeDrawer, loading } = this.props.idea;
    let ButtonSend = (
      <Button className="animated flipInX" onClick={() => sendIdea()} raised color="primary">
        {!isEdit ? "Gửi ý tưởng" : "Cập nhật ý tưởng"} <Icon style={{ padding: "0 0 0 10px" }}>send</Icon>
      </Button>
    );
    let ButtonDisable = (
      <Button className="animated flipInX" disabled raised color="primary">
        Đang tải <Icon style={{ padding: "0 0 0 10px" }}>send</Icon>
      </Button>
    );
    return (
      <div>
        <h3>Nhập ý tưởng và mô tả nếu có</h3>
        {input_form.title.length > 0
          ? !loading ? ButtonSend : ButtonDisable
          : <Button onClick={() => closeDrawer()} color="accent">
              Đóng cửa sổ
            </Button>}

        <div style={{ padding: "2em", textAlign: "center" }}>
          <TextField
            onChange={e => updateData({ title: e.target.value })}
            required
            id="title"
            label="Ý tưởng"
            InputProps={{ placeholder: "Hãy nhập ý tưởng ..." }}
            value={input_form.title}
            fullWidth
          />
          <TextField
            onChange={e => updateData({ content: e.target.value })}
            id="content"
            label="Mô tả"
            InputProps={{ placeholder: "Mô tả ý tưởng của bạn ..." }}
            multiline
            rows="3"
            value={input_form.content}
            fullWidth
          />
        </div>
      </div>
    );
  }
}
