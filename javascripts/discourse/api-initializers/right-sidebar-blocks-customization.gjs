import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.renderInOutlet("above-right-sidebar-blocks", <template>
    <div class="rs-component">
      <div class="sidebar-image">
        <img src={{settings.sidebar_image}} />
      </div>

    </div>
  </template>);

  api.onPageChange(() => {
    console.log("page changed");

    const countSpans = document.querySelectorAll(
      "span.category-topics--posts-count"
    );
    console.log("spans", countSpans);
    countSpans.forEach((span) => {
      const currentText = span.textContent.trim();
      const newText = currentText.replace(/[()]/g, "");
      span.textContent = newText;
      const number = parseInt(newText);
      if (isNaN(number)) {
        span.style.padding = "0px";
      } else if (number < 10) {
        span.style.padding = "0px";
      } else {
        span.style.padding = "0px 3px";
      }
    });
  });
});
