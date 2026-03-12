import Component from "@glimmer/component";
import { service } from "@ember/service";
import SubCategoryItem from "discourse/components/sub-category-item";
import { i18n } from "discourse-i18n";

export default class SubcategoryList extends Component {
  @service router;

  get parentCategory() {
    return this.router.currentRoute.attributes?.category;
  }

  get shouldShowBlock() {
    if (!this.parentCategory.subcategories) {
      return false;
    }

    if (this.args.displayInCategories === undefined) {
      return true;
    }

    return this.args.displayInCategories
      ?.split(",")
      .map(Number)
      .includes(this.parentCategory.id);
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
