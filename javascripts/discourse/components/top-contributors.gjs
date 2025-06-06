import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { concat } from "@ember/helper";
import { eq } from "truth-helpers";
import avatar from "discourse/helpers/avatar";
import icon from "discourse/helpers/d-icon";
import number from "discourse/helpers/number";
import { ajax } from "discourse/lib/ajax";
import { i18n } from "discourse-i18n";

export default class TopContributors extends Component {
  @tracked topContributors = null;
  order = this.args.order || "likes_received";
  period = this.args.period || "yearly";
  count = this.args.count || 5;
  excludedGroupNames = this.args.excludedGroupNames || "";

  constructor() {
    super(...arguments);
    this.blockTitle =
      this.args.title || i18n(themePrefix("top_contributors.heading"));

    ajax(this.requestURL).then((data) => {
      this.topContributors = data.directory_items?.slice(0, this.count);
    });
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.topContributors = null;
  }

  get requestURL() {
    return `/directory_items.json?period=${this.period}&order=${this.order}&exclude_groups=${this.excludedGroupNames}&limit=${this.count}`;
  }

  get viewAllUrl() {
    return `/u?order=${this.order}&period=${this.period}&exclude_groups=${this.excludedGroupNames}`;
  }

  <template>
    <h3 class="top-contributors-heading">
      {{this.blockTitle}}
    </h3>

    <div class="top-contributors--container">
      {{#each this.topContributors as |item|}}
        <div class="top-contributors--user">
          <span
            data-user-card={{item.user.username}}
            class="top-contributors--user-badge"
          >
            {{avatar item.user imageSize="small"}}
            {{#if this.siteSettings.prioritize_username_in_ux}}
              {{item.user.username}}
            {{else if item.user.name}}
              {{item.user.name}}
            {{else}}
              {{item.user.username}}
            {{/if}}
          </span>
          <span
            class={{concat "top-contributors--user-likes order--" this.order}}
          >
            {{#if (eq this.order "likes_received")}}
              {{number item.likes_received}}
              {{icon "heart"}}
            {{else}}
              {{number item.likes_given}}
              {{icon "heart"}}
            {{/if}}
          </span>
        </div>
      {{/each}}
    </div>

    <a class="top-contributors--view-all" href={{this.viewAllUrl}}>
      {{i18n (themePrefix "top_contributors.view_all")}}
    </a>
  </template>
}
