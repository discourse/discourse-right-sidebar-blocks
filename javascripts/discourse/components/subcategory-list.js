import GlimmerComponent from "discourse/components/glimmer";
import { getOwner } from "discourse-common/lib/get-owner";
import { tracked } from "@glimmer/tracking";

export default class SubcategoryList extends GlimmerComponent {
  @tracked parentCategory = null;

  constructor() {
    super(...arguments);

    const parent = getOwner(this).lookup("controller:navigation/category");
    if (parent && parent.showingParentCategory) {
      this.parentCategory = parent;
    }
  }

  willDestroy() {
    this.parentCategory = null;
  }
}
