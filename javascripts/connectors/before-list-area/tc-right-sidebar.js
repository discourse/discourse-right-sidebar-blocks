import { service } from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";

export default {
  setupComponent() {
    this.reopen({
      router: service(),

      @discourseComputed(
        "router.currentRouteName",
        "router.currentRoute.attributes.category.slug",
        "router.currentRoute.attributes.tag.id"
      )
      showSidebar(currentRouteName, categorySlug, tagId) {
        if (this.site.mobileView) {
          return false;
        }

        if (settings.show_in_routes !== "") {
          const selectedRoutes = settings.show_in_routes.split("|");

          if (
            selectedRoutes.includes(currentRouteName) ||
            selectedRoutes.includes(`c/${categorySlug}`) ||
            selectedRoutes.includes(`tag/${tagId}`)
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
