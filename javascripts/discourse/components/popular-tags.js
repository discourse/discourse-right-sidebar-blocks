import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class PopularTags extends Component {
  @service site;
  @tracked topTags = null;

  constructor() {
    super(...arguments);
    const count = this.args?.params?.count || 10;
    let tags;
    const excludedTags = this.args?.params?.excluded_tags || [];
    const scopeToCategory = this.args?.params?.scope_to_category || false;

    if (scopeToCategory) {
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
