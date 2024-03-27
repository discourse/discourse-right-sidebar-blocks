import Component from "@glimmer/component";
import Category from "discourse/models/category";
import I18n from "I18n";

export default class CategoryList extends Component {
  constructor() {
    super(...arguments);
    this.blockTitle =
      this.args?.params?.title || I18n.t(themePrefix("category_list.heading"));

    this.categoryList = this.args?.params?.id.split(",");
    if (!this.categoryList) {
      return;
    }
    this.categoryList.forEach(function (id, i, arr) {
      arr[i] = Category.findById(id);
    });
  }
}
