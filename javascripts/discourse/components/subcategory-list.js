import GlimmerComponent from "discourse/components/glimmer";
import { getOwner } from "discourse-common/lib/get-owner";
import { tracked } from "@glimmer/tracking";

export default class SubcategoryList extends GlimmerComponent {
  @tracked parentCategory = null;

  constructor() {
    super(...arguments);

    const parent = getOwner(this).lookup("controller:navigation/category");
    if (parent && parent.showingParentCategory && this.shouldDisplay(parent)) {
      this.parentCategory = parent;
    }
  }

  shouldDisplay(parent) {
    const parentCategoryId = parent?.category?.id;

    if (parentCategoryId === undefined) {
      return false;
    }

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
