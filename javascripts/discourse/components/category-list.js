import Component from "@glimmer/component";
import Category from "discourse/models/category";
import { i18n } from "discourse-i18n";

export default class CategoryList extends Component {
  constructor() {
    super(...arguments);
    this.blockTitle =
      this.args?.params?.title || i18n(themePrefix("category_list.heading"));

    this.categoryList = this.args?.params?.id.split(",");
    if (!this.categoryList) {
      return;
    }
    this.categoryList.forEach(function (id, i, arr) {
      arr[i] = Category.findById(id);
    });
  }
}
