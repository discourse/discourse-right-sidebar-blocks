import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import categoryLink from "discourse/helpers/category-link";
import htmlSafe from "discourse/helpers/html-safe";
import replaceEmoji from "discourse/helpers/replace-emoji";
import getURL from "discourse/lib/get-url";
import Category from "discourse/models/category";

export default class CategoryTopics extends Component {
  @service store;

  @tracked topics = null;
  @tracked category = null;

  constructor() {
    super(...arguments);
    const count = this.args.count || 10;
    const categoryId = this.args.id;

    if (!categoryId) {
      return;
    }

    const filter = "c/" + categoryId;
    this.category = Category.findById(categoryId);

    this.store.findFiltered("topicList", { filter }).then((result) => {
      const results = result.topic_list.topics;

      results.forEach((topic) => {
        topic.url = `${getURL("/t/")}${topic.slug}/${topic.id}`;
        if (topic.last_read_post_number > 0) {
          topic.url += `/${topic.last_read_post_number}`;
        }
      });

      this.topics = results.slice(0, count);
    });
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.topics = null;
  }

  <template>
    {{categoryLink this.category}}

    <div class="category-topics--content">
      {{#each this.topics as |topic|}}
        <a href={{topic.url}} class="category-topics--topic">
          {{htmlSafe (replaceEmoji topic.fancy_title)}}
          <span class="category-topics--posts-count">
            ({{topic.posts_count}})
          </span>
        </a>
      {{/each}}
    </div>
  </template>
}
