import Component from "@glimmer/component";
import categoryLink from "discourse/helpers/category-link";
import Category from "discourse/models/category";
import { i18n } from "discourse-i18n";

export default class CategoryList extends Component {
  constructor() {
    super(...arguments);
    this.blockTitle =
      this.args.title || i18n(themePrefix("category_list.heading"));

    this.categoryList = this.args.id.split(",");
    if (!this.categoryList) {
      return;
    }
    this.categoryList.forEach(function (id, i, arr) {
      arr[i] = Category.findById(id);
    });
  }

  <template>
    <h3 class="category-list__heading">
      {{this.blockTitle}}
    </h3>

    <div class="category-list__container">
      {{#each this.categoryList as |category|}}
        <div class="category-list__category">
          {{categoryLink category}}
        </div>
      {{/each}}
    </div>
  </template>
}
