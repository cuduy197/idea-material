import TabIdea from "#/TabIdea";

import LiveTest from "~/LiveTest";

@inject("user")
@observer
class Home extends React.Component {
  componentWillMount() {}

  render() {
    let { isLogin, userData } = this.props.user;
    return (
      <div className="animated fadeIn">
        {isLogin === null
          ? <h1>⏳ Đang tải ...</h1>
          : <div>
              <h2>
                Chào mừng <u>{userData.name}</u> đến top 20 ý tưởng 💡
              </h2>
              <TabIdea />
            </div>}
      </div>
    );
  }
}
export default Home;
