import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.renderInOutlet("above-right-sidebar-blocks", <template>
    <div class="rs-component">
      <div class="sidebar-image">
        <img src={{settings.sidebar_image}} />
      </div>
    </div>
  </template>);
});
