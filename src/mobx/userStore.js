import * as firebase from "firebase/app";
import "firebase/auth";
import Parse from "parse";

Parse.initialize("cunghoctot");
Parse.serverURL = "http://35.185.176.28:1337/parse";

firebase.initializeApp({
  apiKey: "AIzaSyBYlx5vhfo7tcjs0tkcsySNHASlgysfVYU",
  authDomain: "react-easy-spa-17.firebaseapp.com"
});

const defaultValue = { name: "khách", username: "", id: "", uid: "" };
class userStore {
  /**
   * Observable                              
   */
  @observable isLogin = null;
  @observable userData = defaultValue;

  /**
   * ACTION
   */
  @action
  checkAuth = () => {
    console.log("Check Firebase auth");
    firebase.auth().onAuthStateChanged(userFirebase => {
      if (userFirebase) {
        console.log("Xin chào: " + userFirebase.displayName);
        console.log(userFirebase.email);
        let payload = {
          name: userFirebase.displayName,
          email: userFirebase.email,
          uid: userFirebase.uid,
          id: userFirebase.providerData[0].uid,
          photoUrl: userFirebase.providerData[0].photoURL
        };

        if (Parse.User.current() !== null) {
          this.login_result(payload);
        } else {
          Parse.User
            .logIn(payload.id, payload.uid)
            .then(userParseLogin => {
              this.login_result(payload);
            })
            .catch(e => {
              //Register new user
              var ParseNewUser = new Parse.User();
              ParseNewUser.set("username", payload.id);
              ParseNewUser.set("name", payload.name);
              ParseNewUser.set("password", payload.uid);
              ParseNewUser.set("uid", payload.uid);
              ParseNewUser.set("fb_id", payload.id);
              payload.email !== null && ParseNewUser.set("email", payload.email);

              ParseNewUser.signUp()
                .then(newUser => {
                  newUser.setACL(new Parse.ACL(Parse.User.current()));
                  newUser.save();

                  this.login_result(payload);
                })
                .catch(e => {
                  alert("Có lỗi : " + e.message);
                  firebase.auth().signOut();
                  document.body.innerHTML = `<div style='text-align:center; padding-top: 12em;' class='animated infinite flash'> <h1 >Có lỗi , đang tải lại trang ...</h1> </div>`;
                  setTimeout(function() {
                    window.history.go(0);
                  }, 500);
                });
            });
        }
      } else {
        console.log("%c Bạn chưa đăng nhập firebase facebook...", "background: blue; color: white");
        console.log(Parse.User.current());
        if (Parse.User.current() !== null) {
          console.log("%c Bạn đã đăng nhập Parse ...", "background: lightgreen; color: white");
          let payload = {
            name: Parse.User.current().get("name"),
            email: Parse.User.current().get("email"),
            username: Parse.User.current().get("username"),
            id: Parse.User.current().id,
            uid: Parse.User.current().get("uid")
          };
          this.login_result(payload);
        } else {
          this.unlogin();
          console.log("%c Bạn chưa đăng nhập Parse ...", "background: lightcoral; color: white");
        }
      }
    });
  };

  @action
  login_result = payload => {
    this.isLogin = true;
    this.userData = payload;
    this.changeAndroiBar("purple");
  };

  @action
  login = () => {
    firebase
      .auth()
      .signInWithRedirect(new firebase.auth.FacebookAuthProvider())
      .catch(e => alert("Có lỗi khi đăng nhập!, vui lòng thử lại"));
  };

  @action
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(e => {
        console.log("Log out Firebase ok!");
        Parse.User.logOut().then(() => this.unlogin());
      })
      .catch(e => alert("Có lỗi khi đăng xuất!, vui lòng thử lại"));
  };

  @action
  unlogin = payload => {
    this.isLogin = false;
    this.userData = defaultValue;
    this.changeAndroiBar("indigo");
  };

  changeAndroiBar = color => document.getElementsByName("theme-color")[0].setAttribute("content", color);
} //end class

const user = new userStore();

//⏱ Check auth when start!
user.checkAuth();

// Auto run when observable change!

autorun(() => {
  //console.log(user.userData);
});

export default user;
