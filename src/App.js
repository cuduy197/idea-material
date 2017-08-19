import "./App.css";
//Mobx store
import user from "@/mobx/userStore";
import idea from "@/mobx/ideaStore";
import live from "@/mobx/liveStore";

//Router
import AppRouter from "./AppRouter";
import { Provider } from "mobx-react";

import DevTools, { configureDevtool } from "mobx-react-devtools";

export default class App extends Component {
  render() {
    return (
      <Provider user={user} idea={idea} live={live}>
        <div>
          {process.env.NODE_ENV === "development" &&
            <DevTools position={{ top: window.innerHeight - 30, right: 10 }} />}
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
