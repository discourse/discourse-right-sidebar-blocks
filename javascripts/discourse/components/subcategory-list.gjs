import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import SubCategoryItem from "discourse/components/sub-category-item";
import { i18n } from "discourse-i18n";

export default class SubcategoryList extends Component {
  @service router;

  @tracked parentCategory = null;

  willDestroy() {
    super.willDestroy(...arguments);
    this.parentCategory = null;
  }

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
    const displayInCategories = this.args.displayInCategories
      ?.split(",")
      .map(Number);

    return (
      displayInCategories === undefined ||
      displayInCategories.includes(parentCategoryId)
    );
  }

  <template>
    {{#if this.shouldShowBlock}}
      <h3 class="subcategory-list--heading">
        {{i18n (themePrefix "subcategory_list.heading")}}
      </h3>

      <div class="subcategory-list--items">
        {{#each this.parentCategory.subcategories as |subcat|}}
          <div class="subcategory-list--item">
            <SubCategoryItem @category={{subcat}} />
          </div>
        {{/each}}
      </div>
    {{/if}}
  </template>
}
