import Home from "~/Home";
import Login from "~/Login";
import LayOut from "~/LayOut";
import LiveTest from "~/LiveTest";

//404
import NotFound from "~/NotFound";
//Ui
import NavBar from "#/NavBar";

export default class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/layout" component={LayOut} />
          <Route path="/live" component={LiveTest} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}
