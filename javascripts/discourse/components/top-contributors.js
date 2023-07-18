import Component from "@glimmer/component";
import { ajax } from "discourse/lib/ajax";
import { tracked } from "@glimmer/tracking";

export default class TopContributors extends Component {
  @tracked topContributors = null;
  order = null;
  viewAllUrl = null;

  constructor() {
    super(...arguments);
    const count = this.args?.params?.count || 5;
    this.order = this.args?.params?.order || "likes_received";
    const period = this.args?.params?.period || "yearly";

    const excludedGroupNames = this.args?.params?.excludedGroupNames || "";

    this.viewAllUrl = `/u?order=${this.order}&period=${period}`;
    const requestURL = `/directory_items.json?period=${period}&order=${this.order}&exclude_groups=${excludedGroupNames}&limit=${count}`;

    ajax(requestURL).then((data) => {
      this.topContributors = data.directory_items.slice(0, count);
    });
  }

  willDestroy() {
    this.topContributors = null;
  }
}
