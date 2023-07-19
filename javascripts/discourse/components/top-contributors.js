import Component from "@glimmer/component";
import { ajax } from "discourse/lib/ajax";
import { tracked } from "@glimmer/tracking";

export default class TopContributors extends Component {
  @tracked topContributors = null;
  order = this.args.params?.order || "likes_received";
  period = this.args.params?.period || "yearly";
  count = this.args.params?.count || 5;

  constructor() {
    super(...arguments);

    ajax(this.requestURL).then((data) => {
      this.topContributors = data.directory_items?.slice(0, this.count);
    });
  }

  get requestURL() {
    const excludedGroupNames = this.args.params?.excludedGroupNames || "";
    return `/directory_items.json?period=${this.period}&order=${this.order}&exclude_groups=${excludedGroupNames}&limit=${this.count}`;
  }

  get viewAllUrl() {
    return `/u?order=${this.order}&period=${this.period}`;
  }

  willDestroy() {
    this.topContributors = null;
  }
}
