/* eslint-disable ember/no-classic-components */
import Component from "@ember/component";
import { computed } from "@ember/object";
import { service } from "@ember/service";
import { tagName } from "@ember-decorators/component";
import RightSidebarBlocks from "../../components/right-sidebar-blocks";

@tagName("")
export default class TcRightSidebar extends Component {
  @service router;
  @service site;

  @computed(
    "router.currentRouteName",
    "router.currentRoute.attributes.category",
    "router.currentRoute.attributes.category.slug",
    "router.currentRoute.attributes.tag.name"
  )
  get showSidebar() {
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
        subcategory = this.router?.currentRoute?.attributes?.category?.slug;
        parentCategory =
          this.router?.currentRoute?.attributes?.category?.ancestors[0].slug;
      }

      return (
        selectedRoutes.includes(this.router?.currentRouteName) ||
        selectedRoutes.includes(
          `c/${this.router?.currentRoute?.attributes?.category?.slug}`
        ) ||
        selectedRoutes.includes(`c/${parentCategory}/${subcategory}`) ||
        selectedRoutes.includes(
          `tag/${this.router?.currentRoute?.attributes?.tag?.name}`
        )
      );
    }

    // if theme setting is empty, show everywhere except /categories
    return this.router?.currentRouteName !== "discovery.categories";
  }

  <template>
    {{#if this.showSidebar}}
      <div class="tc-right-sidebar">
        <RightSidebarBlocks />
      </div>
    {{/if}}
  </template>
}
