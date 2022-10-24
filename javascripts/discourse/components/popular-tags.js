import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class PopularTags extends Component {
  @service site;
  @tracked topTags = null;

  constructor() {
    super(...arguments);
    const count = settings.popular_tags_limit;
    let tags;
    const excludedTags = settings.excluded_tags;

    if (settings.scope_to_category) {
      tags = this.site.category_top_tags;
    } else {
      tags = this.site.get("top_tags");
    }

    if (excludedTags.length !== 0) {
      this.topTags = tags
        .filter((tag) => {
          return excludedTags.indexOf(tag) === -1;
        })
        .slice(0, count);
    } else {
      this.topTags = (tags || []).slice(0, count);
    }
  }

  willDestroy() {
    this.topTags = null;
  }
}
