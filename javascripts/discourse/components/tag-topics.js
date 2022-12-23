import Category from "discourse/models/category";
import Component from "@glimmer/component";
import { ajax } from "discourse/lib/ajax";
import { tracked } from "@glimmer/tracking";

export default class TagTopics extends Component {
  @tracked tagtopics = null;

  constructor() {
    super(...arguments);
    const count = this.args?.params?.count || 5;
    const tagtopics = "/tag/" + this.args?.params?.tag + ".json";

    this.blockTitle = this.args?.params?.title || "#" + this.args?.params?.tag;

    ajax(tagtopics).then((data) => {
      let results = [];
      results = data.topic_list.topics;
      this.tagtopics = results.slice(0, count);
      this.tagtopics.forEach((topic) => {
        topic["category"] = Category.findById(topic.category_id);
      });
    });
  }

  willDestroy() {
    this.tagtopics = null;
  }
}
