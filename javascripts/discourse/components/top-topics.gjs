import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { concat } from "@ember/helper";
import { htmlSafe } from "@ember/template";
import categoryLink from "discourse/helpers/category-link";
import formatDate from "discourse/helpers/format-date";
import replaceEmoji from "discourse/helpers/replace-emoji";
import { ajax } from "discourse/lib/ajax";
import Category from "discourse/models/category";
import { i18n } from "discourse-i18n";

export default class TopTopics extends Component {
  @tracked topTopics = null;

  constructor() {
    super(...arguments);
    const count = this.args.count || 5;
    const period = this.args.period || "weekly";
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
    super.willDestroy(...arguments);
    this.topTopics = null;
  }

  <template>
    <h3 class="top-topics__heading">
      {{i18n (themePrefix "top_topics.heading")}}
    </h3>

    <div class="top-topics__container">
      {{#each this.topTopics as |topic|}}
        <div class="top-topics__topic">
          <div class="top-topics__col">
            <div class="top-topics__topic-title">
              <a
                class="top-topics__topic-link"
                href={{concat "/t/" topic.slug "/" topic.id}}
              >
                {{htmlSafe (replaceEmoji topic.title)}}
              </a>
            </div>
          </div>
          <div class="top-topics__col">
            <span class="top-topics__date">
              {{formatDate topic.last_posted_at format="tiny"}}
            </span>
          </div>

          <div class="top-topics__category">
            {{categoryLink topic.category}}
          </div>
        </div>

      {{/each}}
    </div>
  </template>
}
