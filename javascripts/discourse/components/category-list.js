import Category from "discourse/models/category";
import Component from "@glimmer/component";

export default class CategoryList extends Component {
  constructor() {
    super(...arguments);
    this.blockTitle =
      this.args?.params?.title || I18n.t(themePrefix("category_list.heading"));

    this.categoryList = settings.category_list.split("|");
    this.categoryList.forEach(function (id, i, arr) {
      arr[i] = Category.findById(id);
    });
  }
}
