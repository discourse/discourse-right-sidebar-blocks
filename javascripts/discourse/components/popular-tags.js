import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";

export default class PopularTags extends Component {
  @service site;
  @service router;
  @tracked topTags = null;

  get shouldShowBlock() {
    const currentRoute = this.router.currentRoute;
    const count = this.args?.params?.count || 10;
    const excludedTags = this.args?.params?.excludedTags || [];
    const scopeToCategory = this.args?.params?.scopeToCategory || false;
    const tags =
      (scopeToCategory ? this.site.category_top_tags : this.site.top_tags) ||
      [];
    const category = currentRoute.attributes?.category;

    if (excludedTags.length !== 0) {
      this.topTags = tags
        .filter((tag) => {
          return excludedTags.indexOf(tag) === -1;
        })
        .slice(0, count);
    } else {
      this.topTags = (tags || []).slice(0, count);
    }

    if (this.topTags.length === 0) {
      return false;
    } else if (!this.shouldDisplay(category?.id)) {
      return false;
    } else {
      return true;
    }
  }

  get viewAllUrl() {
    return `/tags`;
  }

  shouldDisplay(categoryId) {
    const displayInSpecificCategories =
      this.args?.params?.displayInSpecificCategories?.split(",").map(Number);

    return (
      displayInSpecificCategories === undefined ||
      displayInSpecificCategories.includes(categoryId)
    );
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.topTags = null;
  }
}
