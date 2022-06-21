import discourseComputed from "discourse-common/utils/decorators";
import { inject as service } from "@ember/service";

export default {
  setupComponent() {
    this.reopen({
      router: service(),

      @discourseComputed("router.currentRouteName")
      showSidebar(currentRouteName) {
        if (this.site.mobileView) {
          return false;
        }

        if (settings.show_in_routes !== "") {
          const selectedRoutes = settings.show_in_routes.split("|");
          return selectedRoutes.includes(currentRouteName) ? true : false;
        }

        // if theme setting is empty, show everywhere except /categories
        return currentRouteName === "discovery.categories" ? false : true;
      },
    });
  },
};
