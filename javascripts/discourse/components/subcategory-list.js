import GlimmerComponent from "discourse/components/glimmer";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class SubcategoryList extends GlimmerComponent {
  @service router;
  @tracked parentCategory = null;

  get shouldShowBlock() {
    const currentRoute = this.router.currentRoute;

    if (currentRoute.attributes?.category === undefined) {
      return false;
    }

    const category = currentRoute.attributes.category;
    this.parentCategory = category;

    if (category.subcategories && this.shouldDisplay(category.id)) {
      return true;
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
    this.parentCategory = null;
  }
}
