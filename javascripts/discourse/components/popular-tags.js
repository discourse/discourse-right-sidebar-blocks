import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class PopularTags extends Component {
  @service site;
  @service router;
  @tracked parentCategory = null;
  @tracked topTags = null;
  @tracked showTags = true;

  constructor() {
    super(...arguments);
    const currentRoute = this.router.currentRoute;
    const category = currentRoute.attributes.category;
    const count = this.args?.params?.count || 10;
    const excludedTags = this.args?.params?.excludedTags || [];
    const scopeToCategory = this.args?.params?.scopeToCategory || false;
    const tags = scopeToCategory
      ? this.site.category_top_tags
      : this.site.top_tags;

    if (excludedTags.length !== 0) {
      this.topTags = tags
        .filter((tag) => {
          return excludedTags.indexOf(tag) === -1;
        })
        .slice(0, count);
    } else {
      this.topTags = (tags || []).slice(0, count);
    }

    if (!currentRoute.attributes?.category) {
      return false;
    }

    this.parentCategory = category;

    if (!this.shouldDisplay(category.id)) {
      this.showTags = false;
    }
  }

  shouldDisplay(parentCategoryId) {
    const displayInCategories = this.args?.params?.displayInCategories
      ?.split(",")
      .map(Number);

    return (
      displayInCategories === undefined ||
      displayInCategories.includes(parentCategoryId)
    );
  }

  willDestroy() {
    this.topTags = null;
  }
}
