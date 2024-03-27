import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";

export default class SubcategoryList extends Component {
  @service router;
  @tracked parentCategory = null;

  get shouldShowBlock() {
    const currentRoute = this.router.currentRoute;

    if (!currentRoute.attributes?.category) {
      return false;
    }

    const category = currentRoute.attributes.category;
    this.parentCategory = category;

    if (category.subcategories && this.shouldDisplay(category.id)) {
      return true;
    }

    return false;
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
    super.willDestroy(...arguments);
    this.parentCategory = null;
  }
}
