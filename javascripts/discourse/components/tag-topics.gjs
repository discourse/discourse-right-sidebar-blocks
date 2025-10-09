import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { concat } from "@ember/helper";
import { htmlSafe } from "@ember/template";
import categoryLink from "discourse/helpers/category-link";
import formatDate from "discourse/helpers/format-date";
import replaceEmoji from "discourse/helpers/replace-emoji";
import { ajax } from "discourse/lib/ajax";
import Category from "discourse/models/category";

export default class TagTopics extends Component {
  @tracked tagTopics = null;

  constructor() {
    super(...arguments);
    const count = this.args.count || 5;
    const tagTopicsUrl = `/tag/${this.args.tag}.json`;

    this.blockTitle = this.args.title || "#" + this.args.tag;

    ajax(tagTopicsUrl).then((data) => {
      let results = [];
      results = data.topic_list.topics;
      this.tagTopics = results.slice(0, count);
      this.tagTopics.forEach((topic) => {
        topic["category"] = Category.findById(topic.category_id);
      });
    });
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.tagTopics = null;
  }

  <template>
    <h3 class="tag-topics__heading">
      {{this.blockTitle}}
    </h3>

    <div class="tag-topics__container">
      {{#each this.tagTopics as |topic|}}
        <div class="tag-topics__topic">
          <div class="tag-topics__col">
            <div class="tag-topics__topic-title">
              <a
                class="tag-topics__topic-link"
                href={{concat "/t/" topic.slug "/" topic.id}}
              >
                {{htmlSafe (replaceEmoji topic.title)}}
              </a>
            </div>
          </div>
          <div class="tag-topics__col">
            <span class="tag-topics__date">
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
