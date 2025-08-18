import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import TopicLink from "discourse/components/topic-list/topic-link";
import categoryLink from "discourse/helpers/category-link";
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
      this.topics = result.topics.slice(0, count);
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
        <TopicLink @topic={{topic}} class="category-topics--topic">
          <span class="category-topics--posts-count">
            ({{topic.posts_count}})
          </span>
        </TopicLink>
      {{/each}}
    </div>
  </template>
}
