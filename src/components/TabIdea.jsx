import { withStyles } from "material-ui/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";

//custom

import IdeaCard from "#/IdeaCard";
import PaginateIdea from "#/PaginateIdea";
import LiveTest from "~/LiveTest";

function TabContainer(props) {
  return (
    <div style={{ padding: 20 }}>
      {props.children}
    </div>
  );
}
@inject("user", "idea")
@observer
export default class FullWidthTabs extends Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.props.idea.loadingStart();
    this.setState({ value });
    setTimeout(() => {
      value === 1 && this.props.idea.getMyIdea();
      value === 0 && this.props.idea.getIdea();
    }, 500);
  };
  handleChangeIndex = index => {
    this.props.idea.loadingStart();
    this.setState({ value: index });
    setTimeout(() => {
      index === 1 && this.props.idea.getMyIdea();
      index === 0 && this.props.idea.getIdea();
    }, 500);
  };
  render() {
    let { userData } = this.props.user;
    let { fakeData, deleteIdea, editIdea, addBulb, loading } = this.props.idea;

    let TabIdea = (
      <div className="idea-container">
        <Grid container spacing={24}>
          {!loading
            ? fakeData.length !== 0
              ? fakeData.map((idea, index) =>
                  <Grid className="animated fadeIn " item xs={12} sm={12} md={12} key={index}>
                    <IdeaCard
                      author={idea.get("author_name")}
                      author_id={idea.get("author").id}
                      content={idea.get("content")}
                      time={String(new Date(idea.createdAt).toLocaleDateString())}
                      delete={() => deleteIdea(idea)}
                      edit={() => editIdea(idea, index)}
                      avatar={idea.get("author_photoUrl")}
                      bulbs={idea.get("bulbs")}
                      title={idea.get("title")}
                      addBulb={() => addBulb(idea, index)}
                    />
                  </Grid>
                )
              : <div style={{ flex: "1" }}>
                  <h1>Chưa có dữ liệu</h1>
                </div>
            : <div style={{ flex: "1" }}>
                <h1>⌛️</h1>
              </div>}
        </Grid>
      </div>
    );

    return (
      <div style={{ width: "100%" }}>
        <Paper>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered>
            <Tab label="Cộng đồng 🌏" />
            <Tab label="Của bạn 😃" />
          </Tabs>
        </Paper>
        <SwipeableViews index={this.state.value} enableMouseEvents={true} onChangeIndex={this.handleChangeIndex}>
          <TabContainer>
            {/* <PaginateIdea className="paginate" /> */}
            {TabIdea}
          </TabContainer>
          <TabContainer>
            {TabIdea}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}
