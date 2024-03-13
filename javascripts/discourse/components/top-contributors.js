import Component from "@glimmer/component";
import { ajax } from "discourse/lib/ajax";
import { tracked } from "@glimmer/tracking";
import I18n from "I18n";

export default class TopContributors extends Component {
  @tracked topContributors = null;
  order = this.args.params?.order || "likes_received";
  period = this.args.params?.period || "yearly";
  count = this.args.params?.count || 5;
  excludedGroupNames = this.args.params?.excludedGroupNames || "";

  constructor() {
    super(...arguments);
    this.blockTitle =
      this.args?.params?.title || I18n.t(themePrefix("top_contributors.heading"));

    ajax(this.requestURL).then((data) => {
      this.topContributors = data.directory_items?.slice(0, this.count);
    });
  }

  get requestURL() {
    return `/directory_items.json?period=${this.period}&order=${this.order}&exclude_groups=${this.excludedGroupNames}&limit=${this.count}`;
  }

  get viewAllUrl() {
    return `/u?order=${this.order}&period=${this.period}&exclude_groups=${this.excludedGroupNames}`;
  }

  willDestroy() {
    this.topContributors = null;
  }
}
