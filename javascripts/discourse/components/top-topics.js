import Category from "discourse/models/category";
import Component from "@glimmer/component";
import { ajax } from "discourse/lib/ajax";
import { tracked } from "@glimmer/tracking";

export default class TopTopics extends Component {
  @tracked topTopics = null;

  constructor() {
    super(...arguments);
    const count = this.args?.params?.count || 5;
    const period = this.args?.params?.period || "weekly";
    const topTopicsUrl = "/top.json?period=" + period.toString();

    ajax(topTopicsUrl).then((data) => {
      let results = [];
      results = data.topic_list.topics;
      this.topTopics = results.slice(0, count);
      this.topTopics.forEach((topic) => {
        topic["category"] = Category.findById(topic.category_id);
      });
    });
  }

  willDestroy() {
    this.topTopics = null;
  }
}
