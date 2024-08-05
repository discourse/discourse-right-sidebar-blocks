import { service } from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";

export default {
  setupComponent() {
    this.reopen({
      router: service(),

      // @discourseComputed(
      //   "router.currentRouteName",
      //   "router.currentRoute.attributes.category.slug",
      //   "router.currentRoute.attributes.tag.id"
      // )
      // showSidebar(currentRouteName, categorySlug, tagId) {
      //   if (this.site.mobileView) {
      //     return false;
      //   }

      //   if (settings.show_in_routes !== "") {
      //     const selectedRoutes = settings.show_in_routes.split("|");

      //     if (
      //       selectedRoutes.includes(currentRouteName) ||
      //       selectedRoutes.includes(`c/${categorySlug}`) ||
      //       selectedRoutes.includes(`tag/${tagId}`)
      //     ) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   }

      //   // if theme setting is empty, show everywhere except /categories
      //   return currentRouteName === "discovery.categories" ? false : true;
      // }

      @discourseComputed(
        "router.currentRouteName",
        "router.currentRoute.attributes.category"
      )
      showSidebar(currentRouteName, category) {
        if (this.site.mobileView) {
          return false;
        }

        if (settings.show_in_routes !== "") {
          const selectedRoutes = settings.show_in_routes.split("|");
          let subcategory = null;
          let parentCategory = null;

        // check if current page is subcategory
          // -- is category
          // -- does not have children itself
          // -- has a parent category
          if (!!this.category &&
            !this.category.has_children &&
            !!this.category.parent_category_id) {
            subcategory = this.category.slug;
            parentCategory = category.ancestors[0].slug
          }

          if (
            selectedRoutes.includes(`"c/${parentCategory}/${subcategory}"`)
          ) {
            return true;
          } else {
            return false;
          }
        }

        // if theme setting is empty, show everywhere except /categories
        return currentRouteName === "discovery.categories" ? false : true;
      },
    });
  },
};
