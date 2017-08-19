import Parse from "parse";
import userStore from "./userStore";

class ideaStore {
  @observable test = "Quiz ok";
  @observable isEdit = false;
  @observable editIndex = null;
  @observable input_form = { title: "", content: "", bulbs: null };
  @observable fakeData = [];
  @observable loading = false;
  @observable openDrawer = false;

  @action
  sendIdea = async () => {
    this.loading = true;
    if (!this.isEdit) {
      try {
        let ideaClass = Parse.Object.extend("Idea");
        let _idea = new ideaClass();

        _idea.set("title", String(this.input_form.title));
        _idea.set("content", String(this.input_form.content));
        _idea.set("bulbs", 0);
        _idea.set("author", Parse.User.current());
        _idea.set("author_name", userStore.userData.name);
        _idea.set("author_photoUrl", userStore.userData.photoUrl);

        let newIdea = await _idea.save();
        this.fakeData.push(newIdea);
        this.resetForm();
      } catch (e) {
        alert(`Có lỗi: ${e.message}`);
        this.resetForm();
      }
    } else {
      try {
        let [editIdea] = await new Parse.Query(Parse.Object.extend("Idea"))
          .equalTo("objectId", this.fakeData[this.editIndex].id)
          .find();
        editIdea.set("title", String(this.input_form.title));
        editIdea.set("content", String(this.input_form.content));

        let newEditIdea = await editIdea.save();

        console.log(newEditIdea);
        this.fakeData[this.editIndex] = newEditIdea;
        this.isEdit = false;
        this.resetForm();
      } catch (e) {
        alert(`Có lỗi: ${e.message}`);
        this.resetForm();
      }
    }
  };
  @action
  resetForm = () => {
    this.loading = false;
    this.closeDrawer();
    setTimeout(() => (this.input_form = { ...this.input_form, title: "", content: "" }), 500);
  };
  @action
  updateData = input => {
    this.input_form = { ...this.input_form, ...input };
  };

  @action
  getIdea = async (skip = 0, limit = 20) => {
    console.log("Get Idea");
    this.loading = true;
    try {
      let result = await new Parse.Query(Parse.Object.extend("Idea"))
        .skip(skip)
        .limit(limit)
        .descending("bulbs")
        .find();
      this.fakeData = result;
      console.log(result);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      alert(`Có lỗi: ${e.message}`);
    }
  };

  @action
  getMyIdea = async (skip = 0, limit = 20) => {
    console.log("Get My Idea");
    this.loading = true;
    try {
      let result = await new Parse.Query(Parse.Object.extend("Idea"))
        .equalTo("author", Parse.User.current())
        .skip(skip)
        .limit(limit)
        .descending("bulbs")
        .find();
      this.fakeData = result;
      console.log(result);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      alert(`Có lỗi: ${e.message}`);
    }
  };

  @action
  loadingStart = () => {
    this.loading = true;
  };

  @action
  showDrawer = () => {
    this.openDrawer = true;
    if (this.isEdit) this.input_form = { title: "", content: "", bulbs: 0 };
  };

  @action
  closeDrawer = () => {
    this.openDrawer = false;
  };

  @action
  searchIdea = async input => {
    this.loading = true;
    console.log(input);

    try {
      let searchResult = await new Parse.Query(Parse.Object.extend("Idea"))
        .contains("title", String(input).normalize())
        .descending("bulbs")
        .limit(20)
        .find();
      this.fakeData = searchResult;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      alert(`Có lỗi: ${e.message}`);
    }
  };

  @action
  editIdea = (idea, index) => {
    this.isEdit = true;
    this.editIndex = index;
    this.openDrawer = true;
    this.input_form = {
      ...this.input_form,
      title: idea.get("title"),
      content: idea.get("content")
    };
  };
  @action
  addBulb = async (idea, index) => {
    try {
      let [ideaAddBulb] = await new Parse.Query(Parse.Object.extend("Idea")).equalTo("objectId", idea.id).find();
      let resultAddBulb = await ideaAddBulb.increment("bulbs").save();
      this.fakeData[index] = resultAddBulb;
    } catch (e) {
      alert(`Có lỗi : ${e.message}`);
    }
  };
  @action
  deleteIdea = async idea => {
    try {
      let [ideaDelete] = await new Parse.Query(Parse.Object.extend("Idea")).equalTo("objectId", idea.id).find();
      await ideaDelete.destroy();
      this.fakeData = this.fakeData.filter(card => card !== idea);
    } catch (e) {
      alert(`Có lỗi: ${e.message}`);
    }
  };
} //end idea store

const idea = new ideaStore();

idea.getIdea();

export default idea;
