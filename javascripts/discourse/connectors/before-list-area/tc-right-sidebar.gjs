import Component from "@ember/component";
import { service } from "@ember/service";
import { tagName } from "@ember-decorators/component";
import discourseComputed from "discourse/lib/decorators";
import RightSidebarBlocks from "../../components/right-sidebar-blocks";

@tagName("")
export default class TcRightSidebar extends Component {
  @service router;
  @service site;

  @discourseComputed(
    "router.currentRouteName",
    "router.currentRoute.attributes.category",
    "router.currentRoute.attributes.category.slug",
    "router.currentRoute.attributes.tag.id"
  )
  showSidebar(currentRouteName, category, categorySlug, tagId) {
    if (this.site.mobileView) {
      return false;
    }

    if (settings.show_in_routes !== "") {
      const selectedRoutes = settings.show_in_routes.split("|");
      let subcategory = null;
      let parentCategory = null;

      // check if current page is subcategory
      const categoryArg = this.outletArgs.category;
      if (
        categoryArg &&
        !categoryArg.has_children &&
        categoryArg.parent_category_id
      ) {
        subcategory = categorySlug;
        parentCategory = category.ancestors[0].slug;
      }

      return (
        selectedRoutes.includes(currentRouteName) ||
        selectedRoutes.includes(`c/${categorySlug}`) ||
        selectedRoutes.includes(`c/${parentCategory}/${subcategory}`) ||
        selectedRoutes.includes(`tag/${tagId}`)
      );
    }

    // if theme setting is empty, show everywhere except /categories
    return currentRouteName !== "discovery.categories";
  }

  <template>
    {{#if this.showSidebar}}
      <div class="tc-right-sidebar">
        <RightSidebarBlocks />
      </div>
    {{/if}}
  </template>
}
