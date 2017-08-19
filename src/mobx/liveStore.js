import Parse from "parse";

class realTimeStore {
  @observable test = "live Ok";
  @observable status = "wait";

  @action
  statusCheck = () => {
    Parse.LiveQuery.on("open", () => {
      this.status = "open";
      console.log("socket connection established");
    });
    Parse.LiveQuery.on("close", () => {
      this.status = "close";
      setTimeout(() => {
        this.status = "wait";
      }, 500);
      console.log("socket connection closed");
    });
    Parse.LiveQuery.on("error", error => {
      this.status = "error";
      alert("Có lỗi");
      console.log(error);
    });
  };
  @action
  subLive = () => {
    let realtime = new Parse.Query("realtime").subscribe();
    realtime.on("open", object => {
      console.log(`realtime subscription opened`);
    });
    realtime.on("create", object => {
      console.log(`Tạo mới  object id ${object.id} !`);
    });

    realtime.on("update", object => {
      console.log("object updated");
    });

    realtime.on("delete", object => {
      console.log("object delete");
    });

    realtime.on("enter", object => {
      console.log("object entered");
    });

    realtime.on("leave", object => {
      console.log("object left");
    });
  };
  @action
  closeLive = () => {
    Parse.LiveQuery.close();
  };

  @action
  createTest = async () => {
    try {
      let realtime = Parse.Object.extend("realtime");
      let live = new realtime();
      live.set("status", "wait");
      let newLive = await live.save();
    } catch (e) {
      alert(e.message);
    }
  };
}

let realTime = new realTimeStore();

realTime.statusCheck();

export default realTime;
